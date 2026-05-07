# Executive Summary

DispatchAI is an empathetic AI-powered system designed to assist 911 operators by aggregating calls, extracting critical details, and classifying emergency severity to reduce response wait times. The project achieved significant recognition by winning the Grand Prize at the UC Berkeley AI Hackathon in June 2024. This top honor included a $25,000 investment from the Berkeley SkyDeck Fund and a 'Golden Ticket' for admission into the prestigious SkyDeck Pad-13 incubator program, providing the team with initial capital and access to a valuable accelerator ecosystem.

# Project Overview

DispatchAI is an empathetic AI-powered 911 response system designed to function as an assistant to human dispatchers, aiming to reduce wait times during critical emergencies. The system is engineered to handle call influxes by transcribing conversations in real-time, extracting crucial information, and presenting it on an operator dashboard. Its core functionality relies on a custom fine-tuned Mistral-7B-v0.1 model, trained on a proprietary dataset of 911 call transcripts, to understand the context of emergencies. The system integrates multiple technologies: Twilio for telephony, Retell for the real-time voice agent, Hume EVI for real-time emotion detection from the caller's voice, and the Google Maps API for geocoding and location visualization. The backend is built with Python and FastAPI, while the operator's interactive dashboard is a Next.js application. A key design principle is the 'human-in-the-loop' approach, where the AI provides suggestions and automates data entry, but the human operator retains final decision-making authority. The team has open-sourced both the fine-tuned model (`spikecodes/ai-911-operator`) and the training dataset (`spikecodes/911-call-transcripts`) on Hugging Face.

# Awards And Recognition

## Award Name

Grand Prize & Best Use of Intel AI

## Awarding Body

UC Berkeley AI Hackathon 2024 (Organizers: UC Berkeley, Cal Hacks, Berkeley SkyDeck) & Intel

## Details

DispatchAI was the recipient of the top award, the Grand Prize, at the UC Berkeley AI Hackathon held on June 22-23, 2024. This prize consisted of a $25,000 investment from the Berkeley SkyDeck Fund and a 'Golden Ticket,' granting the team priority admission into the SkyDeck Pad-13 incubator program. The Grand Prize also included $2,500 in OpenAI credits. In addition, the project won the 'Best Use of Intel AI' award, recognizing its effective implementation of Intel technologies, including the Intel Dev Cloud for model training and the Intel Extension for PyTorch (IPEX) for optimizing inference speed, which the team claimed reduced latency from nearly 3 minutes to under 10 seconds.


# Founders And Contributors

## Name

Kevin Wu

## Role

Frontend, UX, Product

## Specific Contributions

Led the frontend development, user experience (UX), and product design. He developed the comprehensive operator dashboard, focusing on real-time interactivity using a tech stack that included Next.js and TailwindCSS.

## Name

Jasmine Wu

## Role

Human-AI Interfaces, Backend, UX

## Specific Contributions

Credited with starting the project and solo-pitching the finalist demo to the judges. Her contributions included fine-tuning the Mistral model on real 911 call data, building the voice backend, and designing the user experience and human-AI handoff platform based on work with dispatchers.

## Name

Spike O'Carroll

## Role

ML, Backend

## Specific Contributions

Led the machine learning and backend development. He was responsible for the integration of Hume EVI for emotion detection, Twilio for telephony, and the creation of automated extraction and evaluation pipelines. He performed the LLM fine-tuning on the Intel Dev Cloud and is credited as the author of the open-sourced Hugging Face model (spikecodes/ai-911-operator) and dataset (spikecodes/911-call-transcripts).

## Name

Bill Z (Bill Zhang)

## Role

Conversational AI, Voice Agent

## Specific Contributions

Contributed to the conversational AI and voice agent components of the project. He was involved in building the voice backend and integrating the Large Language Model (LLM) to create the agent's interactive capabilities. The project's main YouTube demo is hosted on his channel.


# Hackathon Event Details

## Event Name

UC Berkeley AI Hackathon 2024

## Organizers

UC Berkeley, Cal Hacks, and Berkeley SkyDeck

## Dates

June 22 – 23, 2024

## Sponsors

Berkeley SkyDeck Fund, OpenAI, Intel, Amazon Web Services (AWS), Hume AI, You.com, Groq, Microsoft, Reach Capital, and other corporate and community startup partners.

## Participant Count

930.0

## Submission Count

293.0


# Technical Architecture

## Frontend

The frontend consists of an operator dashboard built with Next.js (a React framework), styled with TailwindCSS and Shadcn, with animations powered by Framer Motion. It features an interactive map for visualizing call locations using Leaflet. This dashboard connects to the backend via a WebSocket for real-time updates.

## Backend

The backend is a central server built with Python using the FastAPI framework. It serves as the hub for the entire system, hosting WebSocket endpoints for real-time communication with the frontend and the voice agent, and orchestrating interactions between all integrated services like Twilio, Retell, Hume, and Google Maps.

## Telephony And Voice Agent

Inbound emergency calls are handled by Twilio, which acts as the primary telephony interface. Twilio forwards the call audio to Retell, which manages the real-time audio websocket and functions as the voice agent, streaming audio to the backend and converting the LLM's text responses back into audio for the caller.

## Emotion Detection

Real-time emotion detection is performed by Hume's Empathic Voice Interface (EVI). The backend server establishes a WebSocket connection to the Hume API, sending audio chunks and receiving word-level emotion predictions. These are aggregated to identify the top emotions, which are used to annotate calls and influence the UI.

## Geolocation

The system utilizes the Google Maps API for geolocation services. Specifically, it uses the geocoding API to extract and verify location information from call transcripts and the Street View API to provide visual context for the operator on the dashboard.

## Llm And Inference

The core intelligence is a custom fine-tuned version of a Mistral large language model. The model inference is performed on the Intel Dev Cloud, leveraging Intel hardware such as the Intel Data Center GPU Max 1100. The performance of the inference process is significantly optimized using the Intel Extension for PyTorch (IPEX).


# Model And Dataset Details

## Base Model

mistralai/Mistral-7B-v0.1

## Fine Tuning Method

The model was fine-tuned using a parameter-efficient fine-tuning (PEFT) technique, specifically Low-Rank Adaptation (LoRA). The training process utilized the PEFT library to apply LoRA adapters to the base model.

## Training Dataset Name

spikecodes/911-call-transcripts

## Dataset Size

The publicly available training dataset snapshot on Hugging Face contains 518 rows in its 'train' split. The project notes mention this is a public version of a larger proprietary dataset curated by the team.

## Huggingface Model Url

https://huggingface.co/spikecodes/ai-911-operator

## Huggingface Dataset Url

https://huggingface.co/datasets/spikecodes/911-call-transcripts


# Performance Optimizations

## Optimization Tool

Intel Extension for PyTorch (IPEX)

## Hardware Environment

The optimization and inference were performed within the Intel Dev Cloud environment, utilizing an Intel(R) Data Center GPU Max 1100.

## Metric Improved

Model Inference Time

## Claimed Result

The team claims a significant reduction in model inference time, from 2 minutes and 53 seconds down to less than 10 seconds. This improvement is attributed to the application of the Intel Extension for PyTorch (IPEX).


# Publicly Available Resources

## Resource Type

GitHub Repository

## Url

https://github.com/IdkwhatImD0ing/DispatchAI

## Resource Type

Devpost Submission Page

## Url

https://devpost.com/software/dispatch-ai

## Resource Type

Hugging Face Model

## Url

https://huggingface.co/spikecodes/ai-911-operator

## Resource Type

Hugging Face Dataset

## Url

https://huggingface.co/datasets/spikecodes/911-call-transcripts

## Resource Type

Live Demo Website

## Url

https://dispatch-ai-lyart.vercel.app/

## Resource Type

YouTube Product Demo

## Url

https://www.youtube.com/watch?v=hdpdgxrilQM

## Resource Type

Figma Design

## Url

https://www.figma.com/design/wCSONTXVKHb5pBLcnex7OZ/Dispatch-AI?node-id=100-2294&t=G4g4EmFHsBrPWXGZ-1


# Post Hackathon Developments

## Program Name

Skydeck Pad-13

## Entry Method

As part of the Grand Prize for winning the UC Berkeley AI Hackathon 2024, the team received a 'Golden Ticket' which granted them entry into the program.

## Associated Investment

$25,000 investment from the Berkeley SkyDeck Fund.


# Public And Community Reception

## Github Metrics

The project's GitHub repository (IdkwhatImD0ing/DispatchAI) has 11 stars, 4 forks, 1 watcher, and 98 commits, indicating a concentrated development effort during the hackathon period with limited subsequent community engagement.

## Huggingface Metrics

The fine-tuned model (`spikecodes/ai-911-operator`) has 2 likes and 9 monthly downloads. The associated dataset (`spikecodes/911-call-transcripts`) also has 9 monthly downloads. These low numbers suggest limited community adoption or usage since the hackathon.

## Devpost Metrics

The project's submission page on Devpost has received approximately 60 likes and 5 comments, reflecting positive reception within the hackathon community.

## Media Coverage Summary

Public reception has been largely confined to the hackathon and developer communities. The project received significant awards, including the Grand Prize at the UC Berkeley AI Hackathon 2024, which was mentioned in team members' social media posts (e.g., LinkedIn). However, there is no evidence of broad mainstream media coverage from major outlets like The New York Times, Wired, or TechCrunch. The project's visibility stems primarily from its Devpost page, GitHub repository, and other self-published artifacts rather than independent news articles or blog analyses.


# Competitive Landscape Analysis

DispatchAI enters the public safety technology landscape as an innovative, early-stage prototype, positioning itself against established players like Corti, RapidSOS, and Carbyne. While these companies offer mature, production-ready solutions, DispatchAI, a Grand Prize winner at the UC Berkeley AI Hackathon 2024, introduces key differentiators that could shape its niche.

**Feature-Level Comparison:**
*   **Corti:** Focuses on real-time AI assistance for triage and post-call QA/coaching. Like DispatchAI, Corti uses voice analytics, but DispatchAI's specific integration of Hume EVI for generating empathetic, emotion-aware dialogue is a unique approach.
*   **RapidSOS:** Acts as a data-enrichment platform, securely pushing verified data (e.g., precise location, telematics) from connected devices to PSAPs. It is not a decision-support engine itself but provides critical context that systems like DispatchAI could leverage. DispatchAI's function is to interpret call content, whereas RapidSOS provides external, verified data.
*   **Carbyne:** Offers a comprehensive NG911 call-handling platform with features like live video, silent chat, and deep CAD integration. Carbyne focuses on being an open, integrated mission-center platform, while DispatchAI's core is the conversational AI agent itself.

**Key Differentiators for DispatchAI:**
1.  **Emotion-Aware Empathetic Responses:** A core differentiator is the integration with Hume EVI to detect caller emotions in real-time and use this analysis to generate empathetic responses from its fine-tuned LLM. This focus on 'empathy' is a central part of its product identity.
2.  **Open-Source Components:** DispatchAI has open-sourced its fine-tuned Mistral model (`spikecodes/ai-911-operator`) and a snapshot of its training dataset (`spikecodes/911-call-transcripts`) on Hugging Face under an MIT license. This transparency contrasts with the proprietary, black-box models of most commercial competitors and could foster community trust, auditability, and faster iteration.
3.  **Fine-Tuned Open LLM Approach:** By using a fine-tuned version of a Mistral-family model, DispatchAI has a potentially more controllable and cost-effective path compared to relying solely on large, closed APIs. This allows for specific tuning on curated 911 call data.
4.  **Web-First, Lightweight Architecture:** As a hackathon project, it was built with a modern web stack (Next.js, FastAPI, Twilio) that enables rapid prototyping and a web-native operator dashboard, potentially offering a more agile deployment model compared to legacy systems.

While DispatchAI demonstrates significant innovation, it remains a prototype. Competitors like Corti, RapidSOS, and Carbyne have established deep integrations with CAD/telephony systems, navigate complex public safety procurement cycles, and hold necessary certifications (e.g., CJIS, SOC2). DispatchAI's path to market would require evolving from a standalone dashboard to a robust, integrable solution that meets these stringent industry requirements.

# Ethical Legal And Regulatory Analysis

## Privacy Considerations

The deployment of DispatchAI involves significant data privacy considerations. Firstly, the applicability of HIPAA is context-dependent; while most municipal Public Safety Answering Points (PSAPs) are not HIPAA-covered entities, DispatchAI would fall under HIPAA's purview if it were deployed in a hospital's dispatch center or acted as a 'business associate' to a covered entity, necessitating a Business Associate Agreement (BAA) and adherence to the Security and Privacy Rules. Secondly, state-level privacy laws are critical. The use of emotion detection could classify voice data as biometric information under laws like the Illinois Biometric Information Privacy Act (BIPA) or sensitive personal information under the California Privacy Rights Act (CPRA), triggering strict notice and consent requirements. A major identified gap is the lack of an explicit, machine-readable PII redaction script or anonymization process for the publicly released 911-call dataset, posing a significant privacy risk given the highly sensitive nature of emergency calls.

## Bias And Fairness Risks

There is a substantial risk of bias in DispatchAI's model. The fine-tuning was performed on a proprietary dataset with a public snapshot of only 518 transcripts, which is likely insufficient to represent the full diversity of demographics, accents, dialects, and languages present in real-world 911 calls. This could lead to performance disparities, where the model may be less accurate for non-native English speakers or individuals with regional accents, potentially resulting in misclassification of emergency severity. Furthermore, the emotion detection component (Hume EVI) could exhibit cultural or demographic biases, misinterpreting emotional cues from different populations. The provided research found no evidence of formal bias testing or the publication of fairness metrics (e.g., accuracy broken down by demographic group), which is a critical gap for any system intended for public safety.

## Liability And Human Oversight

To mitigate liability, DispatchAI's design explicitly incorporates a 'human-in-the-loop' (HITL) safeguard. The project's documentation consistently emphasizes that the AI is an assistant, and 'Dispatchers make the final say.' The UI is designed to provide recommendations, summaries, and suggested actions, but the ultimate decision to dispatch resources remains with the human operator. This HITL architecture is crucial for safety and liability allocation. In any real-world deployment, liability would need to be clearly defined in contracts between the vendor and the public safety agency, covering scenarios like misclassification leading to harm or data breaches. The system's ability to provide clear provenance and confidence scores for its recommendations is essential for enabling effective human oversight and for post-incident forensic analysis.

## Compliance Frameworks

For deployment in a U.S. public safety environment, DispatchAI would need to align with several key compliance frameworks. The National Emergency Number Association (NENA) provides standards for NG911 systems, including the i3 architecture and security guidelines (NG-SEC), which mandate controls for logging, encryption, and access. Additionally, if the system handles or has access to criminal justice information, it would need to comply with the FBI's Criminal Justice Information Services (CJIS) Security Policy, which imposes stringent requirements on personnel background checks, data encryption, and network security. PSAP procurement processes typically require vendors to demonstrate compliance with these standards, often through third-party audits and certifications like SOC 2 or FedRAMP for cloud-based services. The current prototype has not undergone these formal certification processes.


# Go To Market And Business Potential

DispatchAI's business potential is promising but faces the significant hurdles of the public safety market. As a Grand Prize winner of the UC Berkeley AI Hackathon with a $25,000 investment and a 'Golden Ticket' to the Berkeley SkyDeck Pad-13 incubator, the project has a strong launchpad.

**Potential Business Model & Go-to-Market (GTM) Strategy:**
A likely business model would be a B2G (Business-to-Government) SaaS offering, with pricing based on a per-seat license for each dispatcher or a tiered model based on call volume. The GTM strategy should leverage its early-stage advantages:
1.  **Pilot Programs:** Start with paid or grant-funded pilots with smaller, more agile PSAPs to demonstrate value without navigating the full procurement process of a large municipality. The open-source nature of its components could be a draw for innovative agencies.
2.  **Leverage SkyDeck:** Utilize the SkyDeck network for mentorship, legal advice on public sector contracting, and introductions to early-adopter municipalities and investors.
3.  **Focus on a Niche:** Initially focus on its key differentiator—emotion-aware assistance and QA/coaching—rather than attempting to replace entire CAD systems.

**Procurement Challenges:**
The public safety sector is notoriously difficult to penetrate. DispatchAI will face:
*   **Long Sales Cycles:** Procurement can take 6-18 months, involving RFPs, council approvals, and alignment with annual budget cycles.
*   **Stringent Certification Requirements:** Vendors must typically provide evidence of compliance with standards like CJIS, NENA, and SOC 2, which requires significant investment in security and audits.
*   **Vendor Lock-in:** PSAPs have deep-rooted relationships and integrations with established CAD and telephony vendors, making it difficult for new entrants to displace them.

**Potential ROI for PSAPs:**
The value proposition for a PSAP would be based on efficiency and improved outcomes. A potential ROI model could be built on:
*   **Reduced Average Handle Time (AHT):** AI-powered transcription and summarization could shorten call times, freeing up dispatchers.
*   **Improved Accuracy and Reduced False Dispatches:** Better information extraction could lead to more accurate resource allocation, saving costs on unnecessary emergency responses.
*   **Enhanced Training and QA:** The system can be used to automatically review calls and provide feedback, reducing the time supervisors spend on manual QA.

**Opportunities for Partnerships:**
Partnerships are critical for market entry. DispatchAI could partner with:
*   **Data Enrichment Providers:** Collaborating with RapidSOS would allow DispatchAI to ingest verified location and telematics data, enhancing its own analysis.
*   **NG911 Platforms:** Integrating with platforms like Carbyne could provide a pathway into modern 911 infrastructure.
*   **CAD Vendors:** Partnering with major CAD providers (e.g., Motorola, Hexagon) to build certified adapters would be essential for deep integration and auto-populating incident fields, overcoming a major barrier to adoption.

# Known Limitations And Technical Risks

## Category

Dataset Scale, Representativeness, and Privacy

## Description

A critical limitation of DispatchAI is the dataset used for fine-tuning its core Mistral model. The publicly available dataset on Hugging Face (`spikecodes/911-call-transcripts`) contains only 518 rows. This small size poses a significant technical risk to the model's ability to generalize across the vast and complex range of real-world 911 calls, which include diverse accents, languages, background noises, and rare but critical emergency scenarios. This lack of representativeness could lead to poor performance and potential biases. Compounding this risk is the absence of an explicit, auditable PII (Personally Identifiable Information) redaction pipeline mentioned in the public documentation. Publishing and training on sensitive 911 call data without a clear and robust anonymization process creates serious privacy concerns and potential non-compliance with data protection regulations. This limitation directly impacts the model's safety, fairness, and legal viability for real-world deployment.

