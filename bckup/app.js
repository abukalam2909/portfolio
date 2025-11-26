const data = window.siteData;

const byId = (id) => document.getElementById(id);

const renderYaml = () => {
  const el = byId("yaml-block");
  if (!el) return;

  const escapeHtml = (str) =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const formatValue = (raw) => {
    const leading = raw.match(/^\s*/)?.[0] ?? "";
    const value = raw.slice(leading.length);
    const trimmed = value.trim();
    const wrap = (cls, content) =>
      `${leading}<span class="${cls}">${escapeHtml(content)}</span>`;

    if (trimmed === "true" || trimmed === "false") return wrap("val-boolean", value.trim());
    if (!Number.isNaN(Number(trimmed)) && trimmed !== "") return wrap("val-number", value.trim());
    return wrap("val-string", value);
  };

  const highlightLine = (line) => {
    const arrMatch = line.match(/^(\s*)-(\s+)(.+)$/);
    if (arrMatch) {
      const [, indent, gap, rest] = arrMatch;
      return `${indent}<span class="punct">-</span>${gap}${formatValue(rest)}`;
    }

    const keyMatch = line.match(/^(\s*)([A-Za-z0-9_-]+)(:)(.*)$/);
    if (keyMatch) {
      const [, indent, key, colon, rest] = keyMatch;
      return `${indent}<span class="key">${escapeHtml(key)}</span><span class="punct">${colon}</span>${rest ? formatValue(rest) : ""}`;
    }

    return escapeHtml(line);
  };

  const highlighted = data.yaml
    .split("\n")
    .map(highlightLine)
    .join("\n");

  el.innerHTML = highlighted;
};

const createList = (items) => {
  const ul = document.createElement("ul");
  items.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });
  return ul;
};

const renderProjects = () => {
  const grid = byId("project-grid");
  if (!grid) return;
  data.projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "card project-card";

    const media = document.createElement("div");
    media.className = "project-media";
    if (project.media) {
      const img = document.createElement("img");
      img.src = project.media;
      img.alt = project.title;
      media.appendChild(img);
    }

    const body = document.createElement("div");
    body.className = "project-body";

    const title = document.createElement("h3");
    title.className = "project-title";
    title.textContent = project.title;

    const summary = document.createElement("p");
    summary.textContent = project.summary;

    const bullets = createList(project.bullets);

    const stackWrap = document.createElement("div");
    stackWrap.className = "stack-pills";
    if (project.stack) {
      const parts = project.stack.split("·").map((s) => s.trim()).filter(Boolean);
      parts.forEach((part) => {
        const pill = document.createElement("span");
        pill.className = "pill stack-pill";
        pill.textContent = part;
        stackWrap.appendChild(pill);
      });
    }

    body.appendChild(title);
    body.appendChild(summary);
    body.appendChild(bullets);
    body.appendChild(stackWrap);

    if (project.links && project.links.length) {
      const linksWrap = document.createElement("div");
      linksWrap.className = "links";
      project.links.forEach((link) => {
        const a = document.createElement("a");
        a.className = "link-pill";
        a.href = link.href || "#";
        a.target = "_blank";
        a.rel = "noreferrer";
        if (link.label && link.label.toLowerCase().includes("github")) {
          a.classList.add("link-github");
          a.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-.98-.02-1.93-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.7.08-.69.08-.69 1.15.08 1.76 1.19 1.76 1.19 1.03 1.78 2.7 1.27 3.36.97.1-.75.4-1.27.72-1.56-2.56-.29-5.26-1.28-5.26-5.72 0-1.26.45-2.3 1.18-3.11-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.19 1.19a11.14 11.14 0 0 1 5.81 0c2.22-1.5 3.18-1.19 3.18-1.19.63 1.59.23 2.76.11 3.05.74.81 1.18 1.85 1.18 3.1 0 4.45-2.7 5.43-5.28 5.72.41.36.77 1.1.77 2.22 0 1.61-.02 2.91-.02 3.3 0 .3.2.66.79.55A10.54 10.54 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5Z" fill="currentColor"/></svg><span>${link.label}</span>`;
        } else {
          a.textContent = link.label;
        }
        linksWrap.appendChild(a);
      });
      body.appendChild(linksWrap);
    }

    card.appendChild(body);
    card.appendChild(media);
    grid.appendChild(card);
  });
};

const renderExperience = () => {
  const list = byId("experience-list");
  if (!list) return;
  data.experience.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "timeline-item";
    wrapper.innerHTML = `
      <div class="timeline-date">${item.date}</div>
      <div class="timeline-detail">
        <h3>${item.role} · ${item.company}</h3>
        <div class="timeline-meta">${item.location}</div>
      </div>
    `;
    const detail = wrapper.querySelector(".timeline-detail");
    detail.appendChild(createList(item.bullets));
    list.appendChild(wrapper);
  });
};

const renderSkills = () => {
  const grid = byId("skills-grid");
  if (!grid) return;
  const iconMap = {
    aws: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    azure: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
    gcp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    terraform: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
    helm: "https://cdn.simpleicons.org/helm/0F1689",
    kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    prometheus: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg",
    grafana: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg",
    opensearch: "https://cdn.simpleicons.org/opensearch/0052CC",
    "github actions": "https://cdn.simpleicons.org/githubactions/2088FF",
    jenkins: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
    java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    flask: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    "spring boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    "rest apis": "https://cdn.simpleicons.org/openapiinitiative/6BA539",
    sql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    r: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg",
    "amazon bedrock": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    "amazon comprehend": "https://cdn.simpleicons.org/amazonec2/FF9900",
    pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
    genai: "https://cdn.simpleicons.org/openaichat/6e6ef2",
    "anomaly detection": "https://cdn.simpleicons.org/analytics/7a7f87",
    "robot framework": "https://cdn.simpleicons.org/robotframework/000000",
    junit: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/junit/junit-plain.svg",
    postman: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    "agile/scrum": "https://cdn.simpleicons.org/trello/0052CC",
    "ci/cd pipelines": "https://cdn.simpleicons.org/gitlab/FC6D26",
  };
  data.skills.forEach((group) => {
    const card = document.createElement("div");
    card.className = "card";
    const pills = group.items
      .map((skill) => {
        const key = skill.replace(/\s+/g, " ").toLowerCase();
        const iconUrl = iconMap[key];
        if (iconUrl) {
          return `<span class="pill"><img class="pill-icon" src="${iconUrl}" alt="${skill} logo" />${skill}</span>`;
        }
        return `<span class="pill">${skill}</span>`;
      })
      .join("");
    card.innerHTML = `
      <div class="tag">${group.title}</div>
      <div class="skill-set">${pills}</div>
    `;
    grid.appendChild(card);
  });
};

const renderCerts = () => {
  const grid = byId("cert-grid");
  if (!grid) return;
  grid.innerHTML = "";
  data.certifications.forEach((cert) => {
    const link = document.createElement("a");
    link.className = "cert-badge";
    link.href = cert.url || "#";
    link.target = "_blank";
    link.rel = "noreferrer";

    if (cert.badge) {
      const img = document.createElement("img");
      img.src = cert.badge;
      img.alt = cert.name;
      link.appendChild(img);
    }

    grid.appendChild(link);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  if (window.emailjs) {
    emailjs.init("faGxDHK-vNjSSg4Es");
  }
  renderYaml();
  renderProjects();
  renderExperience();
  renderSkills();
  renderCerts();

  const pipelineNodes = Array.from(document.querySelectorAll(".pipeline-node[data-step]"));
  const sections = ["hero", "projects", "experience","education", "skills", "certs", "contact"].map((id) =>
    document.getElementById(id)
  );

  const updatePipeline = (activeIndex) => {
    pipelineNodes.forEach((node, idx) => {
      node.classList.toggle("active", idx === activeIndex);
      node.classList.toggle("completed", idx < activeIndex);
    });
    const branch = document.querySelector(".pipeline-branch");
    if (branch) {
      const completed = activeIndex >= 2;
      branch.classList.toggle("completed", completed);
      branch.querySelectorAll(".branch-node").forEach((bn) => {
        bn.classList.toggle("completed", completed);
      });
    }
  };

  pipelineNodes.forEach((node, idx) => {
    node.addEventListener("click", () => updatePipeline(idx));
  });

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;
    let activeIdx = 0;
    sections.forEach((section, idx) => {
      if (section && section.offsetTop <= scrollPos) {
        activeIdx = idx;
      }
    });
    updatePipeline(activeIdx);
    const rot = (window.scrollY || 0) * 0.08;
    document.documentElement.style.setProperty("--wheel-rot", `${rot}deg`);
  };

  updatePipeline(0);
  window.addEventListener("scroll", onScroll);

  const contactForm = document.getElementById("contact-form");
  const statusEl = document.getElementById("contact-status");
  const submitBtn = document.getElementById("contact-submit");

  if (contactForm && window.emailjs) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }
      if (statusEl) statusEl.textContent = "";
      const formData = new FormData(contactForm);
      const params = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };
      emailjs
        .send("service_4bd8bsm", "template_wnzbh4m", params)
        .then(() => {
          if (statusEl) {
            statusEl.textContent = "Message sent!";
            statusEl.style.color = "#67e9b1";
          }
          contactForm.reset();
        })
        .catch(() => {
          if (statusEl) {
            statusEl.textContent = "Failed to send. Please try again.";
            statusEl.style.color = "#f28b82";
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
          }
        });
    });
  }
});
