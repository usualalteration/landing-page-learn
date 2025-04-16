function validateForm(formData) {
    let errors = [];
  
    // Validazione del nome
    if (!formData.name || formData.name.trim() === "") {
      errors.push("Il nome è obbligatorio.");
    }
  
    // Validazione del cognome
    if (!formData.surname || formData.surname.trim() === "") {
      errors.push("Il cognome è obbligatorio.");
    }
  
    // Validazione dell'email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.push("L'email non è valida.");
    }
  
    // Validazione del telefono (opzionale, ma almeno 10 cifre)
    if (formData.phone && formData.phone.match(/\d/g).length < 10) {
      errors.push("Il numero di telefono deve essere composto da almeno 10 cifre.");
    }
  
    // Validazione del messaggio (opzionale)
    if (formData.message && formData.message.trim() === "") {
      errors.push("Il messaggio non può essere vuoto.");
    }
  
    return errors;
  }
  
