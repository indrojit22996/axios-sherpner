// AXIOS GLOBALS
axios.defaults.headers.common["X-Auth-Token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
// GET REQUEST
async function getTodos() {
  try {
    const config = {
      params: {
        _limit: 5,
      },
    };
    console.log("GET Request RRRR");
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
      config
    );
    console.log(res);
    console.log(res.data);
    showOutput(res);
  } catch (error) {
    console.error(error);
  }
}

// POST REQUEST
async function addTodo() {
  try {
    const config = {
      data: {
        title: "New Todo Indrojit",
        completed: false,
      },
    };
    console.log("POST Request");
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      config
    );
    console.log(res);
    console.log(res.data);
    showOutput(res);
  } catch (error) {
    console.error(error);
  }
}

// PUT/PATCH REQUEST
async function updateTodo() {
  try {
    const config = {
      data: {
        title: "Updated Todo Indrojit",
        completed: true,
      },
    };
    console.log("PUT/PATCH Request");
    const res = await axios.patch(
      "https://jsonplaceholder.typicode.com/todos/1",
      config
    );
    console.log(res);
    console.log(res.data);
    showOutput(res);
  } catch (error) {
    console.log(error);
  }
}

// DELETE REQUEST
async function removeTodo() {
  try {
    const config = {
      data: {
        title: "Updated Todo Indrojit",
        completed: true,
      },
    };
    console.log("DELETE Request");
    const res = await axios.delete(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log(res);
    console.log(res.data);
    showOutput(res);
  } catch (error) {
    console.log(error);
  }
}

// SIMULTANEOUS DATA
function getData() {
  try {
    const config = {
      params: {
        _limit: 5,
      },
    };
    console.log("Simultaneous Request");
    axios
      .all([
        axios.get("https://jsonplaceholder.typicode.com/todos", config),
        axios.get("https://jsonplaceholder.typicode.com/posts", config),
      ])
      .then(
        axios.spread((todos, posts) => {
          showOutput(posts);
        })
      );
  } catch (error) {
    console.log(error);
  }
}

// CUSTOM HEADERS
async function customHeaders() {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorozation: "sometoken",
      },
    };
    console.log("Custom Headers");
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      config
    );
    console.log(res);
    console.log(res.data);
    showOutput(res);
  } catch (error) {
    console.log(error);
  }
}

// TRANSFORMING REQUESTS & RESPONSES
async function transformResponse() {
  try {
    const opction = {
      data: {
        title: "my name is indrojit bhaduri",
      },
      transformResponse: axios.defaults.transformResponse.concat((data) => {
        data.title = data.title.toUpperCase();
        return data;
      }),
    };
    console.log("Transform Response");
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      opction
    );
    console.log(res);
    console.log(res.data);
    showOutput(res);
  } catch (error) {
    console.log(error);
  }
}

// ERROR HANDLING
async function errorHandling() {
  console.log("Error Handling");
  const res = await axios.get("https://jsonplaceholder.typicode.com/todoss");
  showOutput(res).catch((err) => {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

      if (err.response.status === 404) {
        alert("Error: Page Not Found");
      }
    } else if (err.request) {
      console.error(err.request);
    } else {
      console.error(err.massage);
    }
  });
}

// CANCEL TOKEN
async function cancelToken() {
  console.log("Cancel Token");
  const source = axios.CancelToken.source();
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos", {
    cancelToken: source.token,
  });
  showOutput(res).catch((thrown) => {
    if (axios.isCancel(thrown)) {
      console.log("request canceled", thrown.massage);
    }
  });
  if (true) {
    source.cancel("Request canceles!");
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request to ${
        config.url
      } at ${new Date().getTime()}`
    );
  },
  (error) => {
    return Promise.reject(error);
  }
);
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
