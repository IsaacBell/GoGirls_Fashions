if ($('body.chatbot.chat').length === 0)
 {

   //Creating the window
   //Event handler to take action on the user input for chat
   $(document).on('submit', "#chat_form", getResponse);

   //Function to get the Response from chat bot API (api.ai)
   function getResponse(event){
     event.preventDefault();
     //Getting question from input field on the form
     var inputText = $('#question').val();
     console.log(inputText);

     //Ajax request to the back-end to get the response from api.ai
     $.ajax('/chatbot/show', {
       data: {
         question: inputText
       }
     }).done(function (response) {
       //oooh, thats a long way to get the response, but thats how api.ai works ... :|
       var message = response.result.fulfillment.messages[0].speech;
       var parsedResponse = message.replace(/http\S+/, function (url) {
          return '<a href=' + url + '>' + url + '</a>';
        });

       //Appending the question and clear the input field
       var $question = $('<div/>');
       $question.text(inputText);
       $question.addClass('question');
       $(".chat-history").append($question);
       $('#question').val('');

       //Appending to the same page.
       var $response = $('<div/>');
       $response.html(parsedResponse);
       $response.addClass('response');
       $(".chat-history").append($response);
     });

     return false;
   }

 }
