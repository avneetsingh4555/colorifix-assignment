import React, { useRef, useState } from "react";
import './App.css';

function App() {
  const baseURL = "http://127.0.0.1:8000";

  const get_id = useRef(null);
  const get_title = useRef(null);

  const first_name = useRef(null);
  const last_name = useRef(null);
  const user_name = useRef(null);
  const password = useRef(null);

  const put_id = useRef(null);
  const put_title = useRef(null);
  const put_description = useRef(null);
  const put_published = useRef(null);

  const delete_id = useRef(null);

  const [getResult, setGetResult] = useState([]);
  const [postResult, setPostResult] = useState(null);
  const [putResult, setPutResult] = useState(null);
  const [deleteResult, setDeleteResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  }

  async function getAllData() {
    try {
      const res = await fetch(`${baseURL}/add-user/`);
      // console.log(res);

      // if (!res.ok) {
      //   const message = `An error has occured: ${res.status} - ${res.statusText}`;
      //   throw new Error(message);
      // }

      const data = await res.json();

      

      // const result = {
      //   status: res.status + "-" + res.statusText,
      //   headers: {
      //     "Content-Type": res.headers.get("Content-Type"),
      //     "Content-Length": res.headers.get("Content-Length"),
      //   },
      //   length: res.headers.get("Content-Length"),
      //   data: data,
      // };
      // console.log(data.users)
      setGetResult(data.users);
      console.log(getResult);
      
    } catch (err) {
      setGetResult(err.message);
    }
  }

  async function getDataById() {
    const id = get_id.current.value;

    if (id) {
      try {
        const res = await fetch(`${baseURL}/tutorials/${id}`);

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          data: data,
          status: res.status,
          statusText: res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(err.message);
      }
    }
  }

  async function getDataByTitle() {
    const title = get_title.current.value;

    if (title) {
      try {
        // const res = await fetch(`${baseURL}/tutorials?title=${title}`);

        let url = new URL(`${baseURL}/tutorials`);
        const params = { title: title };
        url.search = new URLSearchParams(params);

        const res = await fetch(url);

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          data: data,
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(err.message);
      }
    }
  }

  async function postData() {
    const postData = {
      first_name: first_name.current.value,
      last_name: last_name.current.value,
      username: user_name.current.value,
      password: password.current.value,
    };

    try {
      const res = await fetch(`${baseURL}/add-user/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
      
        },
        body: JSON.stringify(postData),
      });

      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }

      const data = await res.json();

      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: data,
      };

      setPostResult(fortmatResponse(result));
    } catch (err) {
      setPostResult(err.message);
    }
  }

  async function putData() {
    const id = put_id.current.value;

    if (id) {
      const putData = {
        title: put_title.current.value,
        description: put_description.current.value,
        published: put_published.current.checked,
      };

      try {
        const res = await fetch(`${baseURL}/tutorials/${id}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
          },
          body: JSON.stringify(putData),
        });

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };

        setPutResult(fortmatResponse(result));
      } catch (err) {
        setPutResult(err.message);
      }
    }
  }

  async function deleteAllData() {
    try {
      const res = await fetch(`${baseURL}/tutorials`, { method: "delete" });

      const data = await res.json();

      const result = {
        status: res.status + "-" + res.statusText,
        headers: { "Content-Type": res.headers.get("Content-Type") },
        data: data,
      };

      setDeleteResult(fortmatResponse(result));
    } catch (err) {
      setDeleteResult(err.message);
    }
  }

  async function deleteDataById() {
    const id = delete_id.current.value;

    if (id){
      try {
        const res = await fetch(`${baseURL}/tutorials/${id}`, { method: "delete" });

        const data = await res.json();

        const result = {
          status: res.status + "-" + res.statusText,
          headers: { "Content-Type": res.headers.get("Content-Type") },
          data: data,
        };

        setDeleteResult(fortmatResponse(result));
      } catch (err) {
        setDeleteResult(err.message);
      }
    }
  }

  const clearGetOutput = () => {
    setGetResult(null);
  }

  const clearPostOutput = () => {
    setPostResult(null);
  }

  const clearPutOutput = () => {
    setPutResult(null);
  }

  const clearDeleteOutput = () => {
    setDeleteResult(null);
  }

  return (
    <div id="app" className="container my-3">
      <h3>React Fetch example</h3>

      <div className="card mt-3">
        <div className="card-header">React Fetch GET - BezKoder.com</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-primary" onClick={getAllData}>Get All</button>

            <input type="text" ref={get_id} className="form-control ml-2" placeholder="Id" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataById}>Get by Id</button>
            </div>

            <input type="text" ref={get_title} className="form-control ml-2" placeholder="Title" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-primary" onClick={getDataByTitle}>Find By Title</button>
            </div>

            <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Clear</button>
          </div>   
          {getResult.map(user => (
        <div key={user.id}>
          <h2>
            Name: {user.id}        </h2>
        </div>
      ))}
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Fetch POST - BezKoder.com</div>
        <div className="card-body">
          <div className="form-group">
            <input type="text" className="form-control" ref={first_name} placeholder="Title" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={last_name} placeholder="Description" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={user_name} placeholder="Description" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={password} placeholder="Description" />
          </div>
          <button className="btn btn-sm btn-primary" onClick={postData}>Post Data</button>
          <button className="btn btn-sm btn-warning ml-2" onClick={clearPostOutput}>Clear</button>

          { postResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{postResult}</pre></div> }
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Fetch PUT - BezKoder.com</div>
        <div className="card-body">
          <div className="form-group">
            <input type="text" className="form-control" ref={put_id} placeholder="Id" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={put_title} placeholder="Title" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={put_description} placeholder="Description" />
          </div>
          <div className="form-check mb-2">
            <input type="checkbox" className="form-check-input" ref={put_published} />
            <label className="form-check-label" htmlFor="put_published">Publish</label>
          </div>
          <button className="btn btn-sm btn-primary" onClick={putData}>Update Data</button>
          <button className="btn btn-sm btn-warning ml-2" onClick={clearPutOutput}>Clear</button>

          { putResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{putResult}</pre></div> }
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-header">React Fetch DELETE - BezKoder.com</div>
        <div className="card-body">
          <div className="input-group input-group-sm">
            <button className="btn btn-sm btn-danger" onClick={deleteAllData}>Delete All</button>

            <input type="text" ref={delete_id} className="form-control ml-2" placeholder="Id" />
            <div className="input-group-append">
              <button className="btn btn-sm btn-danger" onClick={deleteDataById}>Delete by Id</button>
            </div>

            <button className="btn btn-sm btn-warning ml-2" onClick={clearDeleteOutput}>Clear</button>
          </div>    
          
          { deleteResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{deleteResult}</pre></div> }      
        </div>
      </div>
 
    </div>
  );
}

export default App;
