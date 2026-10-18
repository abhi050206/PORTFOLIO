// Edit the project data below. Evidence buttons only appear when a URL is given.
const RAW = "https://raw.githubusercontent.com/abhi050206/wazuh-soc-lab/main/";

const projects = [
  {
    id: "wazuh",
    title: "Home SOC Monitoring Lab (Wazuh SIEM)",
    year: "2026",
    summary: "A self-hosted Wazuh SIEM with a custom brute-force correlation rule and a documented false-positive triage.",
    what: "A single-node Wazuh SIEM running in Docker, with a Windows 11 endpoint sending Security and Sysmon logs. I used it to write a detection rule, generate real telemetry, and triage the alerts that came back.",
    why: "To practise the workflow a SOC analyst follows: collect logs, write a detection, investigate an alert, and decide whether it is real.",
    objective: "Detect repeated logon failures with a custom rule, and learn to tell a real detection from OS-generated noise.",
    tools: ["Wazuh 4.9", "Docker", "Sysmon", "Windows event logs", "XML rules", "MITRE ATT&CK"],
    flows: [
      { title: "Scenario 1: brute-force detection", steps: ["Windows + Sysmon logs", "Wazuh manager", "Rule 60122: logon failure", "Rule 100010: 5+ in 120 s", "Level 10 alert · T1110"] },
      { title: "Scenario 2: false-positive triage", steps: ["Sysmon event", "Rule 92213 (level 15)", "Inspect dropped file path", "PSScriptPolicyTest artifact", "Verdict: false positive"] }
    ],
    did: [
      "Wrote custom rule 100010 in local_rules.xml. It fires on top of base rule 60122 when 5 or more logon failures occur within 120 seconds, and maps to MITRE ATT&CK T1110.",
      "Simulated failed logons on the Windows agent and confirmed the correlation fired. The alert detail showed rule.frequency 5 with the failures clustered within about 8 seconds.",
      "Investigated a level-15 alert from rule 92213 (executable dropped in a folder commonly used by malware). The file was a __PSScriptPolicyTest_*.ps1 script in the user's Temp folder.",
      "Concluded it was a benign, OS-generated PowerShell policy-test file, recorded the verdict as a false positive, and noted the rule should be tuned to exclude that pattern."
    ],
    skills: ["Writing and testing correlation rules", "Alert triage and false-positive analysis", "Reading Sysmon and Windows event data", "Mapping detections to ATT&CK"],
    outcome: "A working lab with one tested custom detection and one fully documented triage decision.",
    relevance: "Tuning rules and ruling out false positives are routine L1 SOC tasks. This project covers both on a small scale. The tuning step is noted as a recommendation; I did not write a suppression rule.",
    shots: [
      { src: RAW + "architecture.png", alt: "Lab architecture diagram", cap: "Architecture: Windows agent → Wazuh manager → indexer → dashboard." },
      { src: RAW + "rule100010_dashboard.png", alt: "Dashboard showing rule 100010 alert", cap: "Rule 100010 alert at level 10, tagged to Brute Force (T1110)." },
      { src: RAW + "rule100010_detail.png", alt: "Expanded detail of rule 100010 alert", cap: "Alert detail: frequency 5, failures clustered within about 8 seconds." },
      { src: RAW + "scenario2_events.png", alt: "Events for rules 92213 and 92027", cap: "Rule 92213 (dropped executable) and 92027 (PowerShell spawned) firing together." },
      { src: RAW + "rule92213_detail.png", alt: "Expanded detail of rule 92213 alert", cap: "Expanded alert showing the dropped file path." },
      { src: RAW + "scenario2_triage.png", alt: "Triage notes and verdict", cap: "Triage notes and the false-positive verdict." },
      { src: RAW + "agent_status.png", alt: "Wazuh agent status", cap: "Windows agent registered and active." }
    ],
    evidence: { repo: "https://github.com/abhi050206/wazuh-soc-lab" }
  },
  {
    id: "phishing",
    title: "AI Phishing Email Detector",
    year: "2025 – present",
    summary: "A TF-IDF + Logistic Regression classifier trained on 82,486 emails, with a CLI and a Streamlit demo.",
    what: "A machine-learning tool that classifies email text as phishing or safe and lists simple indicators alongside the model's result.",
    why: "To understand how text features separate phishing from normal mail, and how to report model accuracy honestly.",
    objective: "Build a classifier with strong test accuracy and a usable command-line and web interface.",
    tools: ["Python", "scikit-learn", "TF-IDF", "Logistic Regression", "Streamlit"],
    did: [
      "Trained a TF-IDF + Logistic Regression model on 82,486 emails drawn from six public corpora (Enron, Ling, CEAS, Nazario, Nigerian Fraud, SpamAssassin).",
      "Reached 98.2% test accuracy, with precision, recall and F1 around 0.98 for both classes.",
      "Added keyword-based indicators shown next to the prediction: urgency phrases, shortened URLs, a 'verify account' pattern, money or prize wording and excessive exclamation marks.",
      "Built a command-line classifier and an interactive Streamlit web demo, both with a low-confidence warning below 60%."
    ],
    skills: ["Feature engineering for text", "Model evaluation", "Building small CLI and web tools", "Recognising common phishing signals"],
    outcome: "98.2% accuracy on a held-out test set, plus a working CLI and web demo.",
    relevance: "Phishing is a common entry point for attacks, and analysts regularly review suspicious email. The indicators are simple keyword checks, not a production mail filter.",
    evidence: { repo: "https://github.com/abhi050206/ai-phishing-detector" }
  },
  {
    id: "loganalyzer",
    title: "Python Log Analyzer",
    year: "2025 – present",
    summary: "Parses Linux auth logs to find SSH brute-force bursts and flag a successful login after repeated failures.",
    what: "A Python command-line tool that reads Linux authentication logs and flags likely brute-force activity and possible credential compromise.",
    why: "To practise turning raw log lines into a detection an analyst could act on.",
    objective: "Detect brute-force SSH attempts and spot when one of them is followed by a successful login.",
    tools: ["Python", "Linux auth logs", "Regular expressions", "MITRE ATT&CK", "JSON"],
    did: [
      "Parsed failed-password entries per source IP and ranked IPs by attempt count.",
      "Added configurable thresholds: severity rises to CRITICAL when a set number of failures (default 3) fall inside a time window (default 5 minutes).",
      "Flagged a possible compromised credential when an IP with repeated failures later has an accepted login, tagging T1110 and T1078.",
      "Wrote a timestamped text report and, with a --json flag, a JSON file of the results."
    ],
    skills: ["Log parsing with regular expressions", "Event correlation", "Writing incident-style reports", "ATT&CK mapping"],
    outcome: "A tool that turns an auth log into ranked, severity-tagged findings and a report. The repository README reports about 0.04 seconds on a 500-line sample log.",
    relevance: "A failed-then-successful login from one IP is a classic compromise indicator that SOC analysts look for. It was tested on sample logs, not production systems.",
    evidence: { repo: "https://github.com/abhi050206/python-log-analyzer" }
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
    evidence: { repo: "https://github.com/SWATH-Project/SWATH---AI-Powered-Bug-Hunter" }
  },
  {
    id: "scanner",
    title: "Local Vulnerability Scanner",
    year: "2025 – present",
    summary: "A Python + Nmap scanner that maps a local subnet and flags insecure services. A /24 scan takes about 10.5 seconds.",
    what: "A tool that auto-detects the local subnet, discovers hosts, scans common ports with service detection and flags insecure exposure in an HTML report.",
    why: "To learn how network discovery works and what exposed services look like to an attacker.",
    objective: "Quickly find hosts on a local network and highlight risky services.",
    tools: ["Python", "python-nmap", "Nmap", "Jinja2 HTML report", "Kali Linux"],
    did: [
      "Auto-detected the local IP and subnet, so no manual input is needed.",
      "Scanned common ports (FTP, SSH, Telnet, SMTP, HTTP/HTTPS, MySQL, RDP, VNC, Redis) with service and version detection.",
      "Flagged insecure services such as open FTP, Telnet and unauthenticated Redis.",
      "Generated an HTML report with per-host port tables and a security-flags summary. A full /24 (254 hosts) takes about 10.5 seconds."
    ],
    skills: ["Network discovery", "Recognising risky exposed services", "Automating scans and reports"],
    outcome: "A /24 scan and HTML report in about 10.5 seconds with one command.",
    relevance: "Exposure checks are a basic part of vulnerability management. It needs root for version detection and should only be used on networks I own or am authorised to scan.",
    evidence: { repo: "https://github.com/abhi050206/local-vulnerability-scanner" }
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
  return url ? `<a class="btn small" href="${esc(url)}" target="_blank" rel="noopener">${label}</a>` : "";
}
function list(items){ return `<ul>${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`; }
function block(h, content){ return `<div class="q"><h4>${h}</h4>${content}</div>`; }

function flows(p){
  if (!p.flows) return "";
  return block("How it works", p.flows.map(f =>
    `<p class="flow-title">${esc(f.title)}</p><div class="flow">` +
    f.steps.map(s => `<span class="step">${esc(s)}</span>`).join('<span class="arrow">→</span>') +
    `</div>`).join(""));
}

function shots(p){
  if (!p.shots) return "";
  return `<div class="shots">${p.shots.map(s =>
    `<figure><a href="${esc(s.src)}" target="_blank" rel="noopener"><img src="${esc(s.src)}" alt="${esc(s.alt)}" loading="lazy"></a><figcaption>${esc(s.cap)}</figcaption></figure>`
  ).join("")}</div>`;
}

function openProject(p){
  body.innerHTML =
    `<p class="meta" style="color:var(--accent)">${esc(p.year)}</p><h3 id="mTitle">${esc(p.title)}</h3>` +
    block("What was it?", `<p>${esc(p.what)}</p>`) +
    block("Why I built it", `<p>${esc(p.why)}</p>`) +
    block("Objective", `<p>${esc(p.objective)}</p>`) +
    block("Tools &amp; technologies", `<div class="chips">${p.tools.map(t => `<span class="chip">${esc(t)}</span>`).join("")}</div>`) +
    flows(p) +
    block("What I actually did", list(p.did)) +
    block("Skills developed", list(p.skills)) +
    block("Outcome", `<p>${esc(p.outcome)}</p>`) +
    block("Real-world relevance", `<p>${esc(p.relevance)}</p>`) +
    block("Evidence", `<div class="evidence">${evBtn("GitHub repository", p.evidence.repo)}</div>${shots(p)}`);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.scrollTop = 0;
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
