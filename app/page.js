"use client";
import { useState } from "react";
import JokeModal from "./components/JokeModal";
import styles from "./page.module.scss";

export default function Home() {
  const initialPrompt = {
    jokeType: "dad, punny...",
    jokeSubjects: "rat and apple",

  }
  const [prompt, setPrompt] = useState(initialPrompt);
  const [joke, setJoke] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputs = (event) => {
    const { target: { value, name }} = event;
    setPrompt({
      [name]: value
    })
  }
  const focusInputs = (event) => {
    const { target: { name }} = event;
    setPrompt({ [name]: ""});
  }

  const getJokes = async () => {
    setLoading(true);
    try {
      const fullPrompt = `Tell me ${prompt.jokeType || "" } joke about a ${prompt.jokeSubjects || ""} and keep it clean!`;
      const resp = await fetch("/api/openai", {method: "POST", headers: { "Content-Type" : "application/json" }, body: JSON.stringify({ prompt: fullPrompt }) })
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let joke = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        joke += decoder.decode(value, { stream: true });
        setJoke(joke);
      }
      setOpenModal(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.appTitle}>GiggleGenius</h1>

        <div className={styles.jokeFormWrapper}>
          <form className={styles.jokeForm}>
            <div className={styles.jokeSentence}>
              Give me a <input type="text" onFocus={focusInputs} value={prompt.jokeType} name="jokeType" onChange={handleInputs} /> joke 
              about a <input type="text" onFocus={focusInputs} value={prompt.jokeSubjects} name="jokeSubjects" onChange={handleInputs} />!
            </div>
            <button type="button" className={styles.submitButton} onClick={getJokes}>submit</button>
          </form>
          <JokeModal joke={joke} loading={loading} isOpen={openModal} cancel={() => setOpenModal(false)} onOk={() => setOpenModal(false)} onNext={getJokes} />
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
