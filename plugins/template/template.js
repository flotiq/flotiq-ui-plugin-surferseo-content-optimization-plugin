export const buildTemplate = (title, lead, source, faq) => {
  const body = document.createElement('body');

  if (title) {
    body.innerHTML += `<h1>${title}</h1>`;
  }

  if (lead) {
    body.innerHTML += `<p>${lead}</p>`;
  }

  body.innerHTML += source;

  if (faq && faq.length > 0) {
    body.innerHTML += `<h2>Frequently Asked Questions</h2>`;

    body.innerHTML += faq
      .filter(({ question, answer }) => question && answer)
      .map(({ question, answer }) => {
        return `
            <h3>${question}</h3>
            <p>${answer}</p>
        `;
      });
  }

  return body.outerHTML;
};
