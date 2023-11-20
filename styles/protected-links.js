const encryptedLinks = 'U2FsdGVkX1/3oIlGO3OYcpXr6lzzheeA4PGNc+phP/Gli90IXlB3U4k6ZCuruKq5Yow+7mccNyi68Lum64qqGH4ou4hFC7LRGmiL1/+TRII62rAKdYi+9oN/SM3O+Tnr3AJ4raF9Sy/H9fPegRHVjIucsuvA8dzz+F/Fksi86Zf+E2nf+auaqNYj9g20ONtshPRRzc8LT1750g8o7XyzP7KgQXlY4oqnvS4ErjxNzpg2ksD5bOdIrscdXmLpdbSMHQ7OGUpk/U63ISlpOYOr4WG+29+qSh02G50LTtiCH2j15xv/LuKzpfHcEdyKywNGsth3iH3pEUHjLsKPHk3PC1Yd2Zhe30RHhMXck3JPHedN5jVy8YehC2IkklsX+qWO5sJxEjnL+Ohle0WsmFKRiyFiVB5CGWMFuls8EdThb8GTzNvfmJ4zvhXVY01OOUHforxahQv177qUEZqixvYcISPe+YRmeqK39/RiutRAVzG3AIUmQiYRS0SEqqRjorOwMDwBAtnu2WQZWiXLE+2R7yJSlP2mn+hqov3N4EtgZvd/+iU4Fv3lIp+OALQW7F2Xb+EZgsB+PJ7360fzar4q1duOIyEMyc+r8fjzjnJEKN0EVuunSeVi1qwkVjCNNlcnoPxJnrQ5xx+QYRTjJ/8g8JIWJmDXsjkX2ZTcz9jHrNeQCMrQcuZbWv3qjHWxgL3/Tki4b3qj3HtVEeoCi1EWoxP4yMD8snOP3CvXMiYm2YgoCWY522704eJE2SZkRMZqlaJoL5TxbvHlHVvXxoYSuncrlQj8O9nVZXiK5autFT276gA4dWZUaxCJLe2MwyF2owZ4JzrLQNlYaXCiA3ceH9svsgMuI2MTeHsquQa1y3afA4nMrltuyAmaVQfPQ5R7wDHL0Ooy9q1IIgw+zp6Agy/93tAWx6Is/v2Q4yWrTQHgD7XKqJpFflCQ45EM+CreYyRuhSQfxMxcVUsp4LyKIyz5w1v3jTsi6wz7gJTx8viMRzQwNGEPBWpNNV3J3R7dEta9NjH1WE2yB5t3NKRDLW+6XzZUsmIxSC+3pJ1S5IL2Owftz3IPI8g+KeEDAdC5KBbUPlQ1JFxUTwwxR7rMSE1wD3ewCqZKrT2C+pHUw2Q0g+SdgD6VunkZk3w118pO7F5bWQggWQbpCfX3akxZGPM5J2JiPxnIiFlpDwBuqZbeMOgBPEZ6ypJhr/TdLDHHcGMVzWCagTtqzjhdVbMUQXGiqOvdA2jt5OQWIIyHUxNcBGWWV4teIuRHd8RtPonhNHdwevh83fpwIDwQClpxz80eMdXGdYr+KilyumqchgY='
let password = ''

function decrypt(encrypted, passphrase) {
  const decrypted = CryptoJS.AES.decrypt(encrypted, passphrase);
  return decrypted.toString(CryptoJS.enc.Utf8)
}

document.querySelectorAll('a.protected-link').forEach(a => {
  a.setAttribute('href', '#')
  a.onclick = function(e) {
    e.preventDefault()
    if (!password) {
      password = prompt('Enter the password to view this file :')
      if (password == null) return false
    }

    let links
    try {
      const text = decrypt(encryptedLinks, password)
      links = JSON.parse(text)
    } catch {
      password = ''
      alert('Invalid password!')
    }
    const link = links[a.dataset.id]

    if (link) {
      window.open(link).focus()
    }
    return false
  }
})
