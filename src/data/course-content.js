export const modules = [
  {
    id: 'lecture-1', number: '01',
    title: 'Ethics, computing & society',
    shortTitle: 'Foundations',
    description: 'Moral reasoning, professional codes, and the social effects of computing.',
    pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf',
    topics: ['ethics-foundations', 'ethical-theories', 'computing-profession', 'social-impact'],
  },
  {
    id: 'lecture-2', number: '02',
    title: 'Human rights in the digital age',
    shortTitle: 'Human rights',
    description: 'Human dignity, the UDHR, institutions, and digital rights in practice.',
    pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf',
    topics: ['rights-foundations', 'rights-institutions', 'digital-rights'],
  },
  {
    id: 'lecture-3', number: '03',
    title: 'Ethics in software development',
    shortTitle: 'Software practice',
    description: 'Professional duties, intellectual property, responsible development, and safety.',
    pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf',
    topics: ['software-profession', 'ip-integrity', 'software-safety'],
  },
  {
    id: 'lecture-4', number: '04',
    title: 'Fundamentals of AI ethics',
    shortTitle: 'AI fundamentals',
    description: 'Trustworthy AI, bias, fairness, transparency, and human accountability.',
    pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf',
    topics: ['trustworthy-ai', 'ai-fairness', 'ai-accountability', 'ai-lifecycle'],
  },
  {
    id: 'lecture-5', number: '05',
    title: 'Advanced AI & responsible AI',
    shortTitle: 'Responsible AI',
    description: 'Generative AI, deepfakes, autonomy, work, rights, and governance.',
    pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf',
    topics: ['generative-ai', 'misinformation-deepfakes', 'autonomous-systems', 'ai-governance'],
  },
];

export const summaries = [
  {
    id: 'ethics-foundations', moduleId: 'lecture-1', title: 'Ethics, morality & law',
    summary: 'Ethics is a reasoned framework for judging right and wrong; morality describes the beliefs and norms people actually hold, while values are the beliefs they regard as important. Ethics, law, and professional standards overlap but differ in source, scope, and enforcement. An action can be legal yet unethical, or ethical without being legally required. Autonomy, beneficence, non-maleficence, justice, honesty, and accountability are core principles for computing work.',
    sources: [
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 7, section: 'Ethics, Morality, and Values' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 8, section: 'Core Ethical Principles' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 9, section: 'Ethics, Law, and Professional Standards' },
    ],
  },
  {
    id: 'ethical-theories', moduleId: 'lecture-1', title: 'Four ethical lenses',
    summary: 'Utilitarianism asks which option creates the greatest overall good and least aggregate harm. Deontology focuses on duties and rules, including consent and treating people as ends. Virtue ethics asks what a person of good character would do. Rights-based ethics protects fundamental entitlements such as privacy and expression even when a majority might benefit. The theories can complement one another; none settles every dilemma alone. A six-step framework moves from facts and stakeholders through the dilemma, ethical analysis, options, and a documented decision with reflection.',
    sources: [
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 10, section: 'Major Ethical Theories' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 11, section: 'Utilitarianism' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 12, section: 'Deontology' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 13, section: 'Virtue Ethics' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 14, section: 'Rights-Based Ethics' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 16, section: 'Ethical Decision-Making Framework' },
    ],
  },
  {
    id: 'computing-profession', moduleId: 'lecture-1', title: 'Professional practice & codes',
    summary: 'Computing professionals have duties to the public, users, employers, colleagues, the profession, and the environment. Professional standards supplement law and guide conduct. The ACM Code emphasizes the public good, avoiding harm, honesty, fairness, respect for intellectual work, privacy, and confidentiality. The IEEE Code highlights public safety, honest claims, conflicts of interest, rejecting bribery, public understanding, and fair treatment. Software engineers also work within the eight SECEPP principles: public, client and employer, product, judgment, management, profession, colleagues, and self.',
    sources: [
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 17, section: 'Computing as a Profession' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 19, section: 'Responsibilities of Computing Professionals' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 20, section: 'The ACM Code of Ethics' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 21, section: 'The IEEE Code of Ethics' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 8, section: 'Software Engineering Ethical Principles' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 9, section: 'Public; Client and Employer' },
    ],
  },
  {
    id: 'social-impact', moduleId: 'lecture-1', title: 'Computing’s social impact',
    summary: 'Computing can expand access to education and healthcare, improve productivity, connect people, and create new forms of work and expression. It can also erode privacy, amplify bias and misinformation, displace workers, widen digital divides, and increase security or environmental risks. Impacts are both local and global: digital services can improve access while excluding people with limited connectivity or literacy; cross-border data and hardware supply chains create shared responsibilities. The Therac-25 case illustrates why safety checks, incident investigation, and rigorous testing matter when software can affect lives.',
    sources: [
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 22, section: 'Social Impact: Education & Healthcare' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 24, section: 'Benefits and Risks of Computing Technology' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 25, section: 'Local and Global Impacts' },
      { pdf: 'Lecture 1 Introduction to Ethics Computing Society.pdf', page: 30, section: 'Case Study: The Therac-25' },
    ],
  },
  {
    id: 'rights-foundations', moduleId: 'lecture-2', title: 'Foundations & history of human rights',
    summary: 'Human rights arise from inherent human dignity. They are universal, inalienable, indivisible, interdependent, inherent, and non-discriminatory. Natural-rights theory treats rights as prior to the state; legal positivism emphasizes rights codified by states. Modern thinking combines moral grounding with legal and institutional protection. The historical path in the lecture runs from the Magna Carta and Enlightenment declarations to the UN Charter and the 1948 Universal Declaration of Human Rights (UDHR). The UDHR sets out 30 articles but is not itself a binding treaty.',
    sources: [
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 4, section: 'Introduction to Human Rights Philosophy' },
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 5, section: 'Philosophical Foundations & Key Thinkers' },
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 6, section: 'Definition & Characteristics of Human Rights' },
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 10, section: 'The Universal Declaration of Human Rights' },
    ],
  },
  {
    id: 'rights-institutions', moduleId: 'lecture-2', title: 'Rights categories & institutions',
    summary: 'The lecture groups rights as civil, political, social, economic, and cultural. Examples include fair trial and freedom from torture; voting and assembly; education and health; work and social security; and participation in cultural life. UN institutions and treaty-based mechanisms support the human-rights framework. Treaty bodies review state reports, the Universal Periodic Review lets states review one another, special procedures investigate themes or countries, and civil society and media document abuses and press for accountability.',
    sources: [
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 12, section: 'Classification of Human Rights' },
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 13, section: 'Civil & Political Rights' },
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 14, section: 'Economic, Social & Cultural Rights' },
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 15, section: 'International Organizations & the UN System' },
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 16, section: 'Human Rights Monitoring Mechanisms' },
    ],
  },
  {
    id: 'digital-rights', moduleId: 'lecture-2', title: 'Technology, rights & inclusion',
    summary: 'Digital systems affect privacy, expression, identity, access, and accessibility. UDHR Article 12 protects against arbitrary interference with privacy; Article 19 protects seeking, receiving, and imparting information. Platforms shape speech through content moderation, while broad censorship and shutdowns can restrict expression. Digital identity can enable services but also create exclusion, theft, or function creep. Unequal access to connectivity, devices, affordability, and literacy can make rights difficult to exercise. The lecture connects these challenges to business responsibility, Egyptian data-protection law, accessibility, and inclusive digital services.',
    sources: [
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 17, section: 'Violations & Ethical Responsibility' },
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 19, section: 'Privacy in the Digital Age' },
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 20, section: 'Freedom of Expression Online' },
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 21, section: 'Digital Identity, the Digital Divide & Accessibility' },
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 25, section: 'Data Protection & Digital Inclusion in Egypt' },
      { pdf: 'Lecture 2 Ethics and Human Rights Digital Age.pdf', page: 26, section: 'Digital Rights Scenario' },
    ],
  },
  {
    id: 'software-profession', moduleId: 'lecture-3', title: 'Software engineering duties',
    summary: 'Computing ethics asks professionals to look beyond legality and technical correctness, because software can affect people at scale, invisibly, persistently, and across borders. Responsibilities include protecting the public, respecting client confidentiality and authorization, ensuring product quality, giving colleagues credit, and recognizing one’s limits. The ACM and SECEPP codes provide shared public standards. Software engineers should disclose risks, approve only adequately tested products, preserve independent judgment, document limitations, and report code violations.',
    sources: [
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 4, section: 'Why Ethics Matters in Computing' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 6, section: 'Professional Responsibilities of Computer Scientists' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 9, section: 'SE Ethical Principles: Public; Client and Employer' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 10, section: 'SE Ethical Principles: Product; Judgment' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 13, section: 'ACM Code of Ethics' },
    ],
  },
  {
    id: 'ip-integrity', moduleId: 'lecture-3', title: 'Intellectual property & integrity',
    summary: 'Copyright protects the expression of code and documentation, not an underlying idea or algorithm. Fair use or fair dealing is a limited, case-by-case exception, not permission to copy an entire codebase. Software licenses set different rights: proprietary code is restricted, open-source code is available under license terms, and freeware may be free to use while remaining closed-source. Open-source obligations can include attribution, notices, and copyleft sharing. Plagiarism, softlifting, piracy, and uncredited collaboration undermine trust and can also create legal or security risks.',
    sources: [
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 16, section: 'Intellectual Property in Computing' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 17, section: 'Copyright & Fair Use' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 18, section: 'Software Licensing Models' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 19, section: 'Open-Source Ethics' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 20, section: 'Software Piracy' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 21, section: 'Plagiarism & Academic Integrity' },
    ],
  },
  {
    id: 'software-safety', moduleId: 'lecture-3', title: 'Responsible development & user safety',
    summary: 'Responsible development begins with real requirements and builds security, privacy, and accessibility into design. Implementation, testing, deployment, and maintenance all carry duties: verify edge cases, monitor releases, plan rollbacks, and patch vulnerabilities. Reliability is the probability that software performs as intended under stated conditions. Safety-critical systems need extensive testing, independent review, redundancy, and fail-safe mechanisms. The Therac-25 accidents show the danger of software-only safety controls, race conditions, vague error reporting, and dismissing incident reports.',
    sources: [
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 22, section: 'Responsible Software Development' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 23, section: 'Software Reliability & User Safety' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 25, section: 'Ethical Issues in Software Testing' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 26, section: 'The Therac-25 Radiation Overdoses' },
      { pdf: 'Lecture 3 Ethics in Computer Science and Software Development.pdf', page: 27, section: 'Therac-25: Root Causes & Lessons' },
    ],
  },
  {
    id: 'trustworthy-ai', moduleId: 'lecture-4', title: 'Trustworthy AI & bias',
    summary: 'AI ethics asks how values should guide design, development, and deployment. Trustworthy AI requirements include human agency and oversight, technical robustness and safety, privacy and data governance, transparency, diversity and fairness, societal and environmental well-being, and accountability. Bias can enter through historical patterns, sampling, measurement, aggregation, evaluation, or deployment. Amazon’s recruiting tool learned gendered patterns from historical résumés; removing an explicit word did not guarantee that the model would stop using correlated proxies.',
    sources: [
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 3, section: 'What Is AI Ethics?' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 5, section: 'Seven Requirements for Trustworthy AI' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 6, section: 'Where Bias Enters the Pipeline' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 7, section: 'Six Common Sources of Bias' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 8, section: 'Amazon AI Recruiting Tool' },
    ],
  },
  {
    id: 'ai-fairness', moduleId: 'lecture-4', title: 'Fairness & trade-offs',
    summary: 'Fairness has no single universal mathematical definition. Individual fairness compares similar people; group fairness compares statistical outcomes or error rates across protected groups; procedural fairness concerns a consistent and transparent process. Demographic parity compares positive-decision rates, equal opportunity compares true-positive rates, and predictive parity compares precision. With different base rates, some fairness metrics can conflict. Selecting a metric is therefore a value judgment as well as a technical choice. Gender Shades and COMPAS show why subgroup testing and clear definitions matter.',
    sources: [
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 9, section: 'What Does Fair Mean?' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 10, section: 'Common Fairness Metrics' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 11, section: 'The Fairness Trade-off' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 20, section: 'Gender Shades: Findings & Industry Response' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 22, section: 'COMPAS: Findings & the Fairness Debate' },
    ],
  },
  {
    id: 'ai-accountability', moduleId: 'lecture-4', title: 'Explainability, accountability & oversight',
    summary: 'Transparency describes openness about how an AI system works, its data, and its limitations; explainability makes a particular output understandable to people. LIME approximates a model locally, SHAP attributes contributions to input features, feature importance ranks influential variables, and counterfactuals show what input change could alter an outcome. Accountability requires traceable logs, named owners, documentation, and ways to challenge decisions. Human-in-the-loop reviews each decision; human-on-the-loop monitors and can intervene; human-in-command sets objectives and retains broad authority to override or stop the system.',
    sources: [
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 12, section: 'Transparency & Explainability' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 13, section: 'Explainable AI Methods' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 14, section: 'What Does Accountability Require?' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 15, section: 'Who Is Accountable?' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 16, section: 'Levels of Human Oversight' },
    ],
  },
  {
    id: 'ai-lifecycle', moduleId: 'lecture-4', title: 'Responsible AI lifecycle & cases',
    summary: 'Ethical AI work is continuous, from framing the problem through post-deployment monitoring. Design defines purpose and harms; data collection checks provenance, representation, and consent; training documents assumptions and addresses bias; validation checks subgroups and edge cases; deployment provides oversight and disclosure; monitoring detects drift and supports redress. Gender Shades exposed intersectional accuracy disparities; COMPAS made trade-offs in fairness definitions consequential in courtroom decisions.',
    sources: [
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 17, section: 'A Lifecycle, Not a One-Time Checklist' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 18, section: 'Key Practices at Each Stage' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 19, section: 'The Gender Shades Study' },
      { pdf: 'Lecture 4 Fundamentals of AI Ethics.pdf', page: 21, section: 'COMPAS: Risk Scores in the Courtroom' },
    ],
  },
  {
    id: 'generative-ai', moduleId: 'lecture-5', title: 'Generative AI & language models',
    summary: 'Generative AI creates new text, images, audio, video, or code from patterns learned in training data. Its risks include consent and copyright concerns, blurred authorship, biased outputs, and environmental costs. Large language models predict and generate statistically plausible language; they may produce fluent but incorrect hallucinations. Prompts can expose confidential information, training-data provenance can be unclear, and human annotation work raises labor questions. The Samsung case shows why organizations need clear rules for public chatbot use.',
    sources: [
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 6, section: 'What Is Generative AI?' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 7, section: 'Generative AI: Key Ethical Issues' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 9, section: 'Understanding Large Language Models' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 10, section: 'LLM Ethical Issues' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 11, section: 'Corporate Data Leakage via Chatbots' },
    ],
  },
  {
    id: 'misinformation-deepfakes', moduleId: 'lecture-5', title: 'Misinformation & deepfakes',
    summary: 'Generative tools lower the cost of making convincing false content and can localize it across languages. Synthetic accounts can simulate grassroots support, while rapid sharing may outpace fact-checking. Deepfakes use techniques such as GANs or diffusion-based synthesis to imitate a person’s face or voice. Visual cues can help, but detection is an arms race. The Arup fraud demonstrates that realistic video is not reliable identity verification; high-value requests should be confirmed through a separate trusted channel.',
    sources: [
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 13, section: 'AI and the Scale of Misinformation' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 14, section: 'AI-Generated Content in Global Elections' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 15, section: 'Deepfakes: Technology and Mechanics' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 16, section: 'The Deepfake Video-Call Fraud' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 17, section: 'Detection Cues & Response Policy' },
    ],
  },
  {
    id: 'autonomous-systems', moduleId: 'lecture-5', title: 'Autonomous systems & human rights',
    summary: 'Autonomous systems sense, decide, and act with limited or no human intervention; increasing autonomy can lengthen the chain of responsibility. A self-driving car’s pre-programmed choices raise questions about values, liability, and meaningful human control. The 2018 Tempe pedestrian fatality underlines safety obligations to non-users exposed to testing risks. AI surveillance and predictive systems can affect privacy, equal protection, due process, expression, and assembly, especially when people cannot challenge an automated outcome.',
    sources: [
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 18, section: 'Autonomous Systems: An Overview' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 19, section: 'Ethical Dilemmas in Autonomous Decision-Making' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 20, section: 'Autonomous Vehicles: Safety, Testing, and Regulation' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 26, section: 'AI and Human Rights' },
    ],
  },
  {
    id: 'ai-governance', moduleId: 'lecture-5', title: 'Work, governance & the future',
    summary: 'AI may automate some tasks while creating new roles. A just transition pairs transparent communication with equitable reskilling, inclusion, and public-policy support. AI governance includes the institutions and processes that guide development and deployment; governments, industry, academia, and civil society all have roles. The lecture compares regional approaches and introduces OECD AI Principles, NIST’s Govern-Map-Measure-Manage framework, ISO/IEC 42001, and corporate charters. Future concerns include global coordination gaps, concentrated power, human dependence, and systemic risk.',
    sources: [
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 21, section: 'AI and the Future of Work' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 22, section: 'Toward a Just Transition' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 23, section: 'AI Governance: The Global Landscape' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 24, section: 'AI Regulations: A Global Comparison' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 25, section: 'Responsible AI Frameworks' },
      { pdf: 'Lecture 5 Advanced AI Ethics and Responsible AI.pdf', page: 27, section: 'Future Challenges' },
    ],
  },
];

export const formatSource = (source) => `${source.pdf} · PDF p. ${source.page} — ${source.section}`;
