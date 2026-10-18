// Edit the project data below. Anything marked null shows as a "add here" placeholder.
const projects = [
  {
    id: "wazuh",
    title: "Home SOC Monitoring Lab (Wazuh SIEM)",
    year: "2026",
    summary: "A Wazuh SIEM lab with a custom brute-force correlation rule and an end-to-end Sysmon alert triage.",
    what: "A home SOC lab built around Wazuh, collecting Windows and Sysmon telemetry so I could write detections and practise triaging real alerts.",
    why: "To practise the workflow a SOC analyst follows: collect logs, write a detection, investigate an alert, and decide whether it is real.",
    objective: "Detect brute-force logon activity with a custom rule and learn to tell true detections from false positives.",
    tools: ["Wazuh", "Sysmon", "Windows event logs", "XML rules", "MITRE ATT&CK"],
    did: [
      "Wrote a custom Wazuh correlation rule (XML) mapped to MITRE ATT&CK T1110 to detect brute-force logons.",
      "Triaged a high-severity Sysmon alert end to end and closed it as a false positive after reviewing process context.",
      "Documented the false-positive reasoning and a suppression rule for the benign artifact."
    ],
    skills: ["Writing and testing detection rules", "Alert triage and false-positive analysis", "Reading Sysmon process context", "Mapping detections to ATT&CK"],
    outcome: "A working lab with a documented detection and a documented triage decision.",
    relevance: "Rule tuning and false-positive triage are routine L1 SOC tasks. This project shows both on a small scale.",
    evidence: { repo: "https://github.com/abhi050206/wazuh-soc-lab", screenshots: null, writeup: null, demo: null, docs: null }
  },
  {
    id: "phishing",
    title: "AI Phishing Email Detector",
    year: "2025 – present",
    summary: "A TF-IDF + Logistic Regression classifier trained on 82,486 emails, with a CLI and a Streamlit demo.",
    what: "A machine-learning tool that classifies emails as phishing or legitimate and shows simple indicators behind each result.",
    why: "To understand how text features separate phishing from normal mail, and how to evaluate a classifier honestly.",
    objective: "Build a classifier with strong test accuracy and a usable interface.",
    tools: ["Python", "scikit-learn", "TF-IDF", "Logistic Regression", "Streamlit"],
    did: [
      "Trained a TF-IDF + Logistic Regression model on 82,486 emails drawn from six corpora.",
      "Reached 98.2% test accuracy.",
      "Added keyword-based heuristic indicators: urgency language, shortened URLs, credential-harvesting phrases.",
      "Built a command-line tool and an interactive Streamlit web demo."
    ],
    skills: ["Feature engineering for text", "Model evaluation", "Building small CLI and web tools", "Recognising common phishing signals"],
    outcome: "98.2% accuracy on a held-out test set, plus a working CLI and web demo.",
    relevance: "Phishing is a common entry point for attacks, and analysts regularly review suspicious email. The heuristics are simple indicators, not a production filter.",
    evidence: { repo: "https://github.com/abhi050206/ai-phishing-detector", screenshots: null, writeup: null, demo: null, docs: null }
  },
  {
    id: "loganalyzer",
    title: "Python Log Analyzer",
    year: "2025 – present",
    summary: "Parses Linux auth logs to find SSH brute-force bursts followed by a successful login.",
    what: "A Python tool that reads Linux authentication logs and flags likely credential compromise.",
    why: "To practise turning raw log lines into a detection an analyst could act on.",
    objective: "Detect brute-force SSH attempts and spot when one of them succeeds.",
    tools: ["Python", "Linux auth logs", "MITRE ATT&CK", "JSON"],
    did: [
      "Parsed Linux auth logs to detect brute-force SSH attacks.",
      "Correlated bursts of failed logins with a later successful login from the same IP to flag likely compromise.",
      "Mapped findings to MITRE ATT&CK (T1110, T1078).",
      "Exported structured IOC data as JSON alongside timestamped incident reports."
    ],
    skills: ["Log parsing", "Event correlation", "Writing incident-style reports", "ATT&CK mapping"],
    outcome: "A tool that turns auth logs into flagged events, IOC data and a readable report.",
    relevance: "A failed-then-successful login from one IP is a classic compromise indicator that SOC analysts look for.",
    evidence: { repo: "https://github.com/abhi050206/python-log-analyzer", screenshots: null, writeup: null, demo: null, docs: null }
  },
  {
    id: "swath",
    title: "SWATH: AI-Powered Bug-Hunting Framework",
    year: "2026 · group project",
    summary: "Blue Team contributions to a four-person Red/Blue project: SIEM formatter, logger and a tool-visibility dataset.",
    what: "A group project building an AI-assisted bug-hunting framework with a seven-phase pipeline, developed by a team of four (two Red, two Blue).",
    why: "To work on the defender's view of an offensive tool and learn how team projects divide work.",
    objective: "Make the framework's activity visible to defenders and produce logs a SIEM can ingest.",
    tools: ["Python", "Docker", "Splunk / CEF / QRadar formats", "JSON"],
    did: [
      "Built siem_formatter.py, which converts scan events to Splunk, CEF and QRadar formats.",
      "Built hf_logger.py, the logger for the Docker-based recon orchestrator.",
      "Designed tool_fingerprints.json, a dataset mapping SOC/defender visibility for 31 tools."
    ],
    skills: ["Log formatting for SIEMs", "Working in a mixed Red/Blue team", "Thinking about detection visibility"],
    outcome: "Three Blue Team components delivered within the group project.",
    relevance: "Understanding how attacker tooling appears in defender logs helps with writing detections.",
    evidence: { repo: "https://github.com/SWATH-Project/SWATH---AI-Powered-Bug-Hunter", screenshots: null, writeup: null, demo: null, docs: null }
  },
  {
    id: "scanner",
    title: "Local Vulnerability Scanner",
    year: "2025 – present",
    summary: "A Python + Nmap scanner that maps a local subnet and flags insecure services. A /24 scan takes about 10.5 seconds.",
    what: "A tool that auto-detects the local subnet, discovers hosts and flags insecure service exposure.",
    why: "To learn how network discovery works and what exposed services look like to an attacker.",
    objective: "Quickly find hosts on a local network and highlight risky services.",
    tools: ["Python", "Nmap", "HTML reporting"],
    did: [
      "Auto-detected the local subnet and discovered hosts.",
      "Flagged insecure service exposure such as open FTP, Telnet and unauthenticated Redis.",
      "Scanned a full /24 (254 hosts) and generated an HTML report in about 10.5 seconds."
    ],
    skills: ["Network discovery", "Recognising risky exposed services", "Automating scans and reports"],
    outcome: "A /24 scan and HTML report in about 10.5 seconds, verified on a bridged network.",
    relevance: "Exposure checks are a basic part of vulnerability management. This tool is for networks I own or am authorised to scan.",
    evidence: { repo: "https://github.com/abhi050206/local-vulnerability-scanner", screenshots: null, writeup: null, demo: null, docs: null }
  }
];

const cardsEl = document.getElementById("projectCards");
const modal = document.getElementById("modal");
const body = document.getElementById("modalBody");

function esc(s){ return String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

projects.forEach(p => {
  const card = document.createElement("button");
  card.className = "card";
  card.type = "button";
  card.innerHTML =
    `<p class="meta">${esc(p.year)}</p><h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p>` +
    `<div class="chips">${p.tools.slice(0,4).map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>` +
    `<span class="more">View breakdown →</span>`;
  card.addEventListener("click", () => openProject(p));
  cardsEl.appendChild(card);
});

function evBtn(label, url){
  return url
    ? `<a class="btn small" href="${esc(url)}" target="_blank" rel="noopener">${label}</a>`
    : `<span class="btn small ghost" title="Add a link in script.js">${label}: add link</span>`;
}
function list(items){ return `<ul>${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`; }
function block(h, content){ return `<div class="q"><h4>${h}</h4>${content}</div>`; }

function openProject(p){
  body.innerHTML =
    `<p class="meta" style="color:var(--accent)">${esc(p.year)}</p><h3 id="mTitle">${esc(p.title)}</h3>` +
    block("What was it?", `<p>${esc(p.what)}</p>`) +
    block("Why I built it", `<p>${esc(p.why)}</p>`) +
    block("Objective", `<p>${esc(p.objective)}</p>`) +
    block("Tools &amp; technologies", `<div class="chips">${p.tools.map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>`) +
    block("What I actually did", list(p.did)) +
    block("Skills developed", list(p.skills)) +
    block("Outcome", `<p>${esc(p.outcome)}</p>`) +
    block("Real-world relevance", `<p>${esc(p.relevance)}</p>`) +
    block("Evidence", `<div class="evidence">${evBtn("GitHub repository", p.evidence.repo)}${evBtn("Screenshots", p.evidence.screenshots)}${evBtn("Write-up", p.evidence.writeup)}${evBtn("Demo", p.evidence.demo)}${evBtn("Technical docs", p.evidence.docs)}</div>`);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.getElementById("closeBtn").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

const navLinks = document.getElementById("navLinks");
document.getElementById("menuBtn").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();
