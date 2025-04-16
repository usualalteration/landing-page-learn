<script>
  let name = "";
  let surname = "";
  let email = "";
  let phone = "";
  let message = "";
  let feedback = "";
  let errors = [];

  // Funzione per la validazione del form
  function validateForm(formData) {
    let errors = [];

    if (!formData.name || formData.name.trim() === "") {
      errors.push("Il nome è obbligatorio.");
    }

    if (!formData.surname || formData.surname.trim() === "") {
      errors.push("Il cognome è obbligatorio.");
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.push("L'email non è valida.");
    }

    if (formData.phone && formData.phone.match(/\d/g).length < 10) {
      errors.push("Il numero di telefono deve essere composto da almeno 10 cifre.");
    }

    if (formData.message && formData.message.trim() === "") {
      errors.push("Il messaggio non può essere vuoto.");
    }

    return errors;
  }

  async function submitForm() {
  const formData = { name, surname, email, phone, message };
  
  // Esegui la validazione
  errors = validateForm(formData);
  if (errors.length > 0) {
    feedback = "Correggi i seguenti errori: " + errors.join(", ");
    return;
  }

  // Se non ci sono errori, invia i dati al server
  const payload = {
    name,
    surname,
    email,
    phone,
    message
  };

  try {
    const response = await fetch("/api/my/form/hello", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      // Gestisci i vari tipi di errore
      const errorMessage = await response.text();
      feedback = `Errore: ${response.status} - ${errorMessage}`;
    } else {
      const data = await response.json();
      feedback = data.message || "Dati inviati correttamente.";
    }
  } catch (err) {
    feedback = `Errore di connessione al server: ${err.message}`;
  }
}

</script>

<form on:submit|preventDefault={submitForm}>
  <label>Nome
    <input bind:value={name} required />
  </label>

  <label>Cognome
    <input bind:value={surname} required />
  </label>

  <label>Email
    <input bind:value={email} type="email" required />
  </label>

  <label>Telefono
    <input bind:value={phone} type="tel" />
  </label>

  <label>Messaggio
    <textarea bind:value={message}></textarea>
  </label>

  <button type="submit">Invia</button>

  {#if feedback}
    <p class="feedback">{feedback}</p>
  {/if}
</form>

<style>
  form {
    max-width: 500px;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-family: sans-serif;
  }

  label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }

  input, textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  button {
    padding: 0.6rem 1rem;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #555;
  }

  .feedback {
    padding-top: 1rem;
    font-weight: bold;
    color: green;
  }
</style>
