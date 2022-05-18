import Head from "next/head";
import React, { useState, useRef } from "react";
import styles from "./index.module.css";


export default function Home() {
  
  const formulario = useRef(null);
  const [result, setResult] = useState("");

  const [user, setUser] = useState({
  });
  const [users, setUsers] = useState([]);

  const changeUser = e => {
    const v = e.target.value;
    setUser({
      ...user,
      [e.target.name]: v
    });
  };

  async function submitForm(event) {
    event.preventDefault();
    setUsers([...users, user]);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inp: user.name }),
    });
    const data = await response.json();
    setResult (data.result)
    setUser({
        ...user,
        resp: result
      });
    console.log(user)
  }

  const renderBody = () => {
    const content = [];
    users.map((item) => {
      content.unshift(
        <div className={styles.responses}>
          <div className={styles.prompt}>Prompt:</div>
          <div className={styles.prompt}>{item.name}</div>
          <div className={styles.result}>Response:</div>            
          <div className={styles.result}>{item.resp}</div>  
      </div>
      );
     });  
    return content;
  };

  return (
    
    <div>
      <Head>
        <title>Fun with AI</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.content}>
            <img src="/logo.png" className={styles.icon} ref={formulario}/>
            <h3>Fun with AI</h3>
            <p>Enter prompt (VR fitness idea generator):</p>

            <form action=""  className={styles.formulario} onSubmit={submitForm}>
                <input
                  name="name"
                  onChange={changeUser}
                  value={user.name}
                  type="text"
                />
              <input type="submit" value="SUBMIT" />
              <p>Needs to be clicked 3 times</p>
            </form>
            {renderBody()}
          </div>

        
      </main>
           
            
     
    </div>
  );
}
