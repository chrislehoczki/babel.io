import dispatcher from "../dispatcher";

export function initiateTodos(todos) {
  dispatcher.dispatch({
    type: "INITIATE_TODOS",
    todos: todos,
  });
};

export function sendTodo(title) {

  const todo = {title: title}
  console.log("getting through to actions", todo)
  $.ajax({
          url: "/api/todo",
          type: 'POST',
          data: todo,
          error: function(jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
          },
          success: function(data) {
              if (data.err) {
                console.log(data.err);
                return;
              }
              console.log(data)
              dispatcher.dispatch({
              type: "ADDED_TODO",
              todo: data,
              });
          }
        });
};

export function changeStatus(status, id) {

  $.ajax({
          url: "/api/todo",
          type: 'PUT',
          data: {status, id},
          error: function(jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
          },
          success: function(data) {
              if (data.err) {
                console.log(data.err);
                return;
              }
              
              getStockFromDB();
          }
        });
};

export function deleteTodo(id) {
  
  $.ajax({
    url: '/api/todo/' + id,
    type: 'DELETE',
    success: function(result) {
        if (result.err) {
            console.log(result.err);
            return;
        }

        console.log(result);
        dispatcher.dispatch({
              type: "DELETED_TODO",
              todos: result,
              });
        
    }, 
    error: function(err) {
      console.log(err);
    }
    });
  
};

export function getStockFromDB() {
  

   $.ajax({
    url: '/api/todo',
    type: 'GET',
    success: function(data) {
      if (data.err) {
          console.log(data.err);
          return;
        }
      dispatcher.dispatch({
            type: "UPDATED_TODOS",
            todos: data
          });
      return data;
    }, 
    error: function(err) {
      console.log(err);
    }
    });

};

