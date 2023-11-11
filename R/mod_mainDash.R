#' mainDash UI Function
#'
#' @description A shiny Module.
#'
#' @param id,input,output,session Internal parameters for {shiny}.
#'
#' @noRd 
#'
#' @importFrom shiny NS tagList 
#' @import echarts4r
mod_mainDash_ui <- function(id){
  ns <- NS(id)
  tagList(
    column(width = 12, align = "center",
           bs4Dash::actionButton(
             inputId = ns("nextScenario"), label = "Next Scenario",
             status = "danger",
             outline = TRUE,
             flat = TRUE,
             size = "lg",
             icon = icon("heart")
             # class = "btn-primary btn-lg"
           )
    ),
    column(8,
           # Plots
           plotOutput(ns("plot1")),
           echarts4rOutput(ns("gaugeChart")),
           # Button
           actionButton(ns("changeData"), "Change Scenario")
    ),
    column(4,
           # Image
           img(src = "https://lilianweng.github.io/posts/2018-02-19-rl-overview/RL_illustration.png", height = "200px"),
           # Text Block
           uiOutput(ns("textBlock"))
    )
  )
}
    
#' mainDash Server Functions
#'
#' @noRd 
mod_mainDash_server <- function(id){
  moduleServer( id, function(input, output, session){
    ns <- session$ns

    # Reactive value to store the current start row
    startRow <- reactiveVal(1)
    
    # Reactive expression to generate df_temp
    df_temp <- reactive({
      invalidateLater(1000, session)  # Invalidate every 1000 milliseconds (1 second)
      start <- startRow()
      
      # Ensure the start row loops back when it reaches the end
      if (start + 9 > nrow(df)) {
        startRow(1)
      } else {
        startRow(start + 1)
      }
      
      # Subset df to get the next 10 rows
      df[start:(start + 9), ]
    })
    #------------------------------------

    
    # Render the gauge chart
    output$gaugeChart <- renderEcharts4r({
      # browser()
      if (is.null(gauge_value())){
        numi <- 5
      } else {
        numi <- isolate(gauge_value())
      }
      e_charts() |>
        e_gauge(numi, "percent")  # Use the reactive gauge value
    })    
    
    #-----------------------
    
    # Load Data
    data <- read.csv("inst/app/www/data.csv")
    colnames(data) <- c("t", "y")
    
    # Render Plots
    output$plot1 <- renderPlot({ 
      ggplot(data, aes(x = t, y = y)) +
        geom_line(color = "blue") + # Change line color
        labs(title = "Your Plot Title", 
             x = "Time Step", 
             y = "Value on Y-Axis") + # Add titles and labels
        theme_minimal() + # Apply a minimal theme
        theme(text = element_text(size = 12)) # Adjust text size for better readability
    })
    # Similarly for plot2 and plot3 with temperature and rhb
    
    observeEvent(input$nextScenario, {
      # Example data to send in POST request
      postData <- list(
        heart_rate = 0.1,            # Replace with actual data
        resting_heart_rate = 0.1,            # Replace with actual data
        oxygen_saturation = 0.1,     # Replace with actual data
        temperature = 0.1,             # Replace with actual data
        sleep = 0.1,             # Replace with actual data
        mood = 0.1             # Replace with actual data
      )
      
      # Making the POST request
      response <- httr::POST("localhost:8001/prevent", body = postData, encode = "json")
      
      # Assuming the response is in JSON format
      responseContent <- content(response, "parsed")
      
      #------------------------------------------------
      gptResponds <- openai::create_chat_completion(
        model = "gpt-4-1106-preview",
        message  = list(        
          list(
            "role" = "user",
            "content" = paste(
              "This is a test, i give you a number and you describe this number:",
              responseContent$action
              
            ) 
          )
        ),
        max_tokens = 500
      )
      
      # Update the reactive value or output to display the response
      # For example, if you want to display part of the response in a text block
      output$textBlock <- renderText({
        gptResponds$choices$message.content
      })
    })
    
    # Update Text Block
    output$textBlock <- renderUI({
      # Code to display text received from API
    })    
    
  })
}
    
## To be copied in the UI
# mod_mainDash_ui("mainDash_1")
    
## To be copied in the server
# mod_mainDash_server("mainDash_1")
