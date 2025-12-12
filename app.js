// Pegando elementos do HTML
const form = document.getElementById("job-form");
const jobsDiv = document.getElementById("jobs");

// Lista de vagas (carrega do navegador ou começa vazia)
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// Função que desenha as vagas na tela
function renderJobs() {
    
    const counter = document.getElementById("counter");
counter.textContent = `Total applications: ${jobs.length}`;
  jobsDiv.innerHTML = ""; // limpa a tela

  jobs.forEach((job, index) => {
    const div = document.createElement("div");
    div.className = "job";

    div.innerHTML = `
      <strong>${job.title}</strong> at ${job.company}<br>
      Status: ${job.status}<br>
      <button onclick="deleteJob(${index})">Delete</button>
    `;

    jobsDiv.appendChild(div);
  });
}

// Evento do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault(); // impede recarregar a página

  const title = document.getElementById("title").value;
  const company = document.getElementById("company").value;
  const status = document.getElementById("status").value;

  const job = {
    title: title,
    company: company,
    status: status
  };

  jobs.push(job); // adiciona na lista

  localStorage.setItem("jobs", JSON.stringify(jobs)); // salva no navegador

  renderJobs(); // atualiza a tela
  form.reset(); // limpa o formulário
});

// Função para deletar vaga
function deleteJob(index) {
  jobs.splice(index, 1); // remove da lista
  localStorage.setItem("jobs", JSON.stringify(jobs));
  renderJobs();
}

// Mostra as vagas ao abrir o site
renderJobs();
