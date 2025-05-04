import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import frame from "./../../assets/Frame.png";
import joblogo from "./../../assets/joblogo.png";


const ProfessionalSummary = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    about: '',
    skills: [],
    newSkill: '',
    annual_income: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addSkill = () => {
    if (formData.newSkill.trim() && !formData.skills.includes(formData.newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: '',
      }));
    }
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (
      !formData.about.trim() ||
      formData.skills.length === 0 ||
      !formData.annual_income.trim()
    ) {
      alert('⚠️ Please fill all the fields before continuing!');
      return false;
    }
    return true;
  };
  

  const handleNext = async (e) => {
    e.preventDefault();
    if(!validateForm()) return;

    const token = sessionStorage.getItem('authToken'); // Assuming token is stored as 'token'
    if (!token) {
      console.error("❌ No token found in sessionStorage");
      return;
    }

    const payload = {
      about: formData.about,
      skills: formData.skills,
      annual_income: parseFloat(formData.annual_income),
    };

    try {
      const response = await fetch('https://arshan.digital/professional-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Error uploading data:", data);
      } else {
        alert(`✅ Professional data uploaded successfully`);
        navigate('/user/onboarding/work-experience');
      }
    } catch (error) {
      console.error("❌ Network or server error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-[87vh] w-[85%] mx-auto bg-white border mt-2 border-gray-300 shadow-lg shadow-gray-300/60 rounded-xl">
      <div className="flex flex-1 rounded-xl shadow-md shadow-slate-300">
        {/* Left Panel */}
        <div className="flex-1 flex justify-center items-center p-8 bg-white rounded-s-xl">
          <div className="max-w-md w-full">
            <form className="grid gap-y-6" onSubmit={handleNext}>
              {/* About */}
              <div className="relative mb-5">
                <textarea
                id='about'
                  name="about"
                  placeholder=" "
                  value={formData.about}
                  onChange={handleChange}
                  className="peer w-full p-4 border border-gray-300 text-gray-500 text-sm min-h-[100px] focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                />
                <label
                htmlFor='about'
                  className={`absolute left-4 transition-all text-gray-500 text-sm ${formData.about
                    ? '-top-2 text-sm bg-white px-1'
                    : 'top-4 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                    }`}
                >
                  About
                </label>

              </div>

              {/* Skills */}
              <div className="mb-2">
                <div className="relative flex items-center mb-2">
                  <select
                    value={formData.newSkill}
                    onChange={(e) => setFormData({ ...formData, newSkill: e.target.value })}
                    className="peer w-[80%] scrollbar-custom flex-1 px-4 pt-2 pb-2 border border-gray-300 h-[41px] text-base text-gray-600  focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                  >
                    <option value="" disabled>Select a skill area</option>
                    <option class='hover:bg-[#2c6472]' value="Active Listening">Active Listening</option>
                    <option class='hover:bg-[#2c6472]' value="Clear Verbal Communication">Clear Verbal Communication</option>
                    <option class='hover:bg-[#2c6472]' value="Written Communication">Written Communication</option>
                    <option class='hover:bg-[#2c6472]' value="Giving Feedback">Giving Feedback</option>
                    <option class='hover:bg-[#2c6472]' value="Receiving Feedback">Receiving Feedback</option>
                    <option class='hover:bg-[#2c6472]' value="Public Speaking">Public Speaking</option>
                    <option class='hover:bg-[#2c6472]' value="Storytelling">Storytelling</option>
                    <option class='hover:bg-[#2c6472]' value="Presentation Skills">Presentation Skills</option>
                    <option class='hover:bg-[#2c6472]' value="Non-Verbal Communication">Non-Verbal Communication</option>
                    <option class='hover:bg-[#2c6472]' value="Multilingual Communication">Multilingual Communication</option>
                    <option class='hover:bg-[#2c6472]' value="Team Coordination">Team Coordination</option>
                    <option class='hover:bg-[#2c6472]' value="Conflict Resolution">Conflict Resolution</option>
                    <option class='hover:bg-[#2c6472]' value="Building Consensus">Building Consensus</option>
                    <option class='hover:bg-[#2c6472]' value="Empathy">Empathy</option>
                    <option class='hover:bg-[#2c6472]' value="Delegation">Delegation</option>
                    <option class='hover:bg-[#2c6472]' value="Trust Building">Trust Building</option>
                    <option class='hover:bg-[#2c6472]' value="Supporting Colleagues">Supporting Colleagues</option>
                    <option class='hover:bg-[#2c6472]' value="Mentorship">Mentorship</option>
                    <option class='hover:bg-[#2c6472]' value="Inclusiveness">Inclusiveness</option>
                    <option class='hover:bg-[#2c6472]' value="Encouraging Diversity Of Thought">Encouraging Diversity Of Thought</option>
                    <option class='hover:bg-[#2c6472]' value="Decision Making">Decision Making</option>
                    <option class='hover:bg-[#2c6472]' value="Strategic Thinking">Strategic Thinking</option>
                    <option class='hover:bg-[#2c6472]' value="Vision Sharing">Vision Sharing</option>
                    <option class='hover:bg-[#2c6472]' value="Leading By Example">Leading By Example</option>
                    <option class='hover:bg-[#2c6472]' value="Motivating Others">Motivating Others</option>
                    <option class='hover:bg-[#2c6472]' value="Responsibility Ownership">Responsibility Ownership</option>
                    <option class='hover:bg-[#2c6472]' value="Performance Monitoring">Performance Monitoring</option>
                    <option class='hover:bg-[#2c6472]' value="Stakeholder Management">Stakeholder Management</option>
                    <option class='hover:bg-[#2c6472]' value="Influencing Others">Influencing Others</option>
                    <option class='hover:bg-[#2c6472]' value="Situational Leadership">Situational Leadership</option>
                    <option class='hover:bg-[#2c6472]' value="Prioritization">Prioritization</option>
                    <option class='hover:bg-[#2c6472]' value="Scheduling">Scheduling</option>
                    <option class='hover:bg-[#2c6472]' value="Goal Setting">Goal Setting</option>
                    <option class='hover:bg-[#2c6472]' value="Meeting Deadlines">Meeting Deadlines</option>
                    <option class='hover:bg-[#2c6472]' value="Punctuality">Punctuality</option>
                    <option class='hover:bg-[#2c6472]' value="Task Tracking">Task Tracking</option>
                    <option class='hover:bg-[#2c6472]' value="Focus">Focus</option>
                    <option class='hover:bg-[#2c6472]' value="Workload Management">Workload Management</option>
                    <option class='hover:bg-[#2c6472]' value="Productivity Habits">Productivity Habits</option>
                    <option class='hover:bg-[#2c6472]' value="Avoiding Procrastination">Avoiding Procrastination</option>
                    <option class='hover:bg-[#2c6472]' value="Analytical Thinking">Analytical Thinking</option>
                    <option class='hover:bg-[#2c6472]' value="Root Cause Analysis">Root Cause Analysis</option>
                    <option class='hover:bg-[#2c6472]' value="Brainstorming">Brainstorming</option>
                    <option class='hover:bg-[#2c6472]' value="Logical Reasoning">Logical Reasoning</option>
                    <option class='hover:bg-[#2c6472]' value="Lateral Thinking">Lateral Thinking</option>
                    <option class='hover:bg-[#2c6472]' value="Creative Problem Solving">Creative Problem Solving</option>
                    <option class='hover:bg-[#2c6472]' value="Risk Identification">Risk Identification</option>
                    <option class='hover:bg-[#2c6472]' value="Troubleshooting">Troubleshooting</option>
                    <option class='hover:bg-[#2c6472]' value="Cost-Benefit Analysis">Cost-Benefit Analysis</option>
                    <option class='hover:bg-[#2c6472]' value="Decision Under Uncertainty">Decision Under Uncertainty</option>
                    <option class='hover:bg-[#2c6472]' value="Handling Change">Handling Change</option>
                    <option class='hover:bg-[#2c6472]' value="Fast Learning">Fast Learning</option>
                    <option class='hover:bg-[#2c6472]' value="Open-Mindedness">Open-Mindedness</option>
                    <option class='hover:bg-[#2c6472]' value="Unlearning Outdated Methods">Unlearning Outdated Methods</option>
                    <option class='hover:bg-[#2c6472]' value="Dealing With Ambiguity">Dealing With Ambiguity</option>
                    <option class='hover:bg-[#2c6472]' value="Handling Multiple Roles">Handling Multiple Roles</option>
                    <option class='hover:bg-[#2c6472]' value="Working Across Time Zones">Working Across Time Zones</option>
                    <option class='hover:bg-[#2c6472]' value="Adjusting Priorities">Adjusting Priorities</option>
                    <option class='hover:bg-[#2c6472]' value="Remote Collaboration">Remote Collaboration</option>
                    <option class='hover:bg-[#2c6472]' value="Accepting Feedback">Accepting Feedback</option>
                    <option class='hover:bg-[#2c6472]' value="Self-Awareness">Self-Awareness</option>
                    <option class='hover:bg-[#2c6472]' value="Self-Regulation">Self-Regulation</option>
                    <option class='hover:bg-[#2c6472]' value="Stress Management">Stress Management</option>
                    <option class='hover:bg-[#2c6472]' value="Empathetic Communication">Empathetic Communication</option>
                    <option class='hover:bg-[#2c6472]' value="Patience">Patience</option>
                    <option class='hover:bg-[#2c6472]' value="Emotional Control">Emotional Control</option>
                    <option class='hover:bg-[#2c6472]' value="Conflict De-Escalation">Conflict De-Escalation</option>
                    <option class='hover:bg-[#2c6472]' value="Recognizing Team Mood">Recognizing Team Mood</option>
                    <option class='hover:bg-[#2c6472]' value="Cultural Sensitivity">Cultural Sensitivity</option>
                    <option class='hover:bg-[#2c6472]' value="Positive Attitude">Positive Attitude</option>
                    <option class='hover:bg-[#2c6472]' value="Information Management">Information Management</option>
                    <option class='hover:bg-[#2c6472]' value="Documentation Habits">Documentation Habits</option>
                    <option class='hover:bg-[#2c6472]' value="Meeting Facilitation">Meeting Facilitation</option>
                    <option class='hover:bg-[#2c6472]' value="Agenda Preparation">Agenda Preparation</option>
                    <option class='hover:bg-[#2c6472]' value="Note Taking">Note Taking</option>
                    <option class='hover:bg-[#2c6472]' value="Decision Logging">Decision Logging</option>
                    <option class='hover:bg-[#2c6472]' value="File Organization">File Organization</option>
                    <option class='hover:bg-[#2c6472]' value="Resource Allocation">Resource Allocation</option>
                    <option class='hover:bg-[#2c6472]' value="Process Optimization">Process Optimization</option>
                    <option class='hover:bg-[#2c6472]' value="Milestone Tracking">Milestone Tracking</option>
                    <option class='hover:bg-[#2c6472]' value="Idea Generation">Idea Generation</option>
                    <option class='hover:bg-[#2c6472]' value="Open Brainstorming">Open Brainstorming</option>
                    <option class='hover:bg-[#2c6472]' value="Design Thinking">Design Thinking</option>
                    <option class='hover:bg-[#2c6472]' value="Prototyping Mindset">Prototyping Mindset</option>
                    <option class='hover:bg-[#2c6472]' value="Visual Thinking">Visual Thinking</option>
                    <option class='hover:bg-[#2c6472]' value="Concept Development">Concept Development</option>
                    <option class='hover:bg-[#2c6472]' value="Experimentation">Experimentation</option>
                    <option class='hover:bg-[#2c6472]' value="Challenging Norms">Challenging Norms</option>
                    <option class='hover:bg-[#2c6472]' value="Iteration Thinking">Iteration Thinking</option>
                    <option class='hover:bg-[#2c6472]' value="Innovation Evangelism">Innovation Evangelism</option>
                    <option class='hover:bg-[#2c6472]' value="Accountability">Accountability</option>
                    <option class='hover:bg-[#2c6472]' value="Integrity">Integrity</option>
                    <option class='hover:bg-[#2c6472]' value="Ownership Mindset">Ownership Mindset</option>
                    <option class='hover:bg-[#2c6472]' value="Self-Motivation">Self-Motivation</option>
                    <option class='hover:bg-[#2c6472]' value="Consistency">Consistency</option>
                    <option class='hover:bg-[#2c6472]' value="Confidentiality">Confidentiality</option>
                    <option class='hover:bg-[#2c6472]' value="Learning From Failure">Learning From Failure</option>
                    <option class='hover:bg-[#2c6472]' value="Reliability">Reliability</option>
                    <option class='hover:bg-[#2c6472]' value="Following Through">Following Through</option>
                    <option class='hover:bg-[#2c6472]' value="Respect For Others">Respect For Others</option>
                    <option class='hover:bg-[#2c6472]' value="Project Planning">Project Planning</option>
                    <option class='hover:bg-[#2c6472]' value="Agile Methodology">Agile Methodology</option>
                    <option class='hover:bg-[#2c6472]' value="Scrum Framework">Scrum Framework</option>
                    <option class='hover:bg-[#2c6472]' value="Kanban Boards">Kanban Boards</option>
                    <option class='hover:bg-[#2c6472]' value="Jira Usage">Jira Usage</option>
                    <option class='hover:bg-[#2c6472]' value="Trello Usage">Trello Usage</option>
                    <option class='hover:bg-[#2c6472]' value="Notion Project Tracking">Notion Project Tracking</option>
                    <option class='hover:bg-[#2c6472]' value="Confluence Documentation">Confluence Documentation</option>
                    <option class='hover:bg-[#2c6472]' value="CI/CD Pipelines">CI/CD Pipelines</option>
                    <option class='hover:bg-[#2c6472]' value="Git Version Control">Git Version Control</option>
                    <option class='hover:bg-[#2c6472]' value="GitHub Workflows">GitHub Workflows</option>
                    <option class='hover:bg-[#2c6472]' value="GitLab">GitLab</option>
                    <option class='hover:bg-[#2c6472]' value="Bitbucket">Bitbucket</option>
                    <option class='hover:bg-[#2c6472]' value="Code Branching Strategy">Code Branching Strategy</option>
                    <option class='hover:bg-[#2c6472]' value="Shell Scripting">Shell Scripting</option>
                    <option class='hover:bg-[#2c6472]' value="Linux Basics">Linux Basics</option>
                    <option class='hover:bg-[#2c6472]' value="Docker Containers">Docker Containers</option>
                    <option class='hover:bg-[#2c6472]' value="Kubernetes Orchestration">Kubernetes Orchestration</option>
                    <option class='hover:bg-[#2c6472]' value="Jenkins Automation">Jenkins Automation</option>
                    <option class='hover:bg-[#2c6472]' value="RESTful API Design">RESTful API Design</option>
                    <option class='hover:bg-[#2c6472]' value="GraphQL Usage">GraphQL Usage</option>
                    <option class='hover:bg-[#2c6472]' value="Postman For API Testing">Postman For API Testing</option>
                    <option class='hover:bg-[#2c6472]' value="Swagger Documentation">Swagger Documentation</option>
                    <option class='hover:bg-[#2c6472]' value="OAuth Authentication">OAuth Authentication</option>
                    <option class='hover:bg-[#2c6472]' value="JSON Data Structuring">JSON Data Structuring</option>
                    <option class='hover:bg-[#2c6472]' value="XML Handling">XML Handling</option>
                    <option class='hover:bg-[#2c6472]' value="SQL Queries">SQL Queries</option>
                    <option class='hover:bg-[#2c6472]' value="PostgreSQL">PostgreSQL</option>
                    <option class='hover:bg-[#2c6472]' value="MySQL">MySQL</option>
                    <option class='hover:bg-[#2c6472]' value="MongoDB">MongoDB</option>
                    <option class='hover:bg-[#2c6472]' value="Redis">Redis</option>
                    <option class='hover:bg-[#2c6472]' value="Database Indexing">Database Indexing</option>
                    <option class='hover:bg-[#2c6472]' value="Data Modeling">Data Modeling</option>
                    <option class='hover:bg-[#2c6472]' value="Firebase Integration">Firebase Integration</option>
                    <option class='hover:bg-[#2c6472]' value="Backend Development">Backend Development</option>
                    <option class='hover:bg-[#2c6472]' value="Frontend Development">Frontend Development</option>
                    <option class='hover:bg-[#2c6472]' value="ReactJS">ReactJS</option>
                    <option class='hover:bg-[#2c6472]' value="Vue.js">Vue.js</option>
                    <option class='hover:bg-[#2c6472]' value="Angular">Angular</option>
                    <option class='hover:bg-[#2c6472]' value="HTML/CSS">HTML/CSS</option>
                    <option class='hover:bg-[#2c6472]' value="SCSS">SCSS</option>
                    <option class='hover:bg-[#2c6472]' value="Tailwind CSS">Tailwind CSS</option>
                    <option class='hover:bg-[#2c6472]' value="JavaScript">JavaScript</option>
                    <option class='hover:bg-[#2c6472]' value="TypeScript">TypeScript</option>
                    <option class='hover:bg-[#2c6472]' value="Python">Python</option>
                    <option class='hover:bg-[#2c6472]' value="Go">Go</option>
                    <option class='hover:bg-[#2c6472]' value="Java">Java</option>
                    <option class='hover:bg-[#2c6472]' value="C#">C#</option>
                    <option class='hover:bg-[#2c6472]' value="Node.js">Node.js</option>
                    <option class='hover:bg-[#2c6472]' value="Express.js">Express.js</option>
                    <option class='hover:bg-[#2c6472]' value="API Security">API Security</option>
                    <option class='hover:bg-[#2c6472]' value="Input Validation">Input Validation</option>
                    <option class='hover:bg-[#2c6472]' value="Error Handling">Error Handling</option>
                    <option class='hover:bg-[#2c6472]' value="Logging Practices">Logging Practices</option>
                    <option class='hover:bg-[#2c6472]' value="Exception Tracking">Exception Tracking</option>
                    <option class='hover:bg-[#2c6472]' value="Unit Testing">Unit Testing</option>
                    <option class='hover:bg-[#2c6472]' value="Integration Testing">Integration Testing</option>
                    <option class='hover:bg-[#2c6472]' value="End-To-End Testing">End-To-End Testing</option>
                    <option class='hover:bg-[#2c6472]' value="Test-Driven Development (TDD)">Test-Driven Development (TDD)</option>
                    <option class='hover:bg-[#2c6472]' value="Behavior-Driven Development (BDD)">Behavior-Driven Development (BDD)</option>
                    <option class='hover:bg-[#2c6472]' value="Jest">Jest</option>
                    <option class='hover:bg-[#2c6472]' value="Mocha">Mocha</option>
                    <option class='hover:bg-[#2c6472]' value="Cypress">Cypress</option>
                    <option class='hover:bg-[#2c6472]' value="Selenium">Selenium</option>
                    <option class='hover:bg-[#2c6472]' value="DevOps Tools">DevOps Tools</option>
                    <option class='hover:bg-[#2c6472]' value="Cloud Computing">Cloud Computing</option>
                    <option class='hover:bg-[#2c6472]' value="AWS Services (EC2, S3, RDS, Lambda)">AWS Services (EC2, S3, RDS, Lambda)</option>
                    <option class='hover:bg-[#2c6472]' value="Azure DevOps">Azure DevOps</option>
                    <option class='hover:bg-[#2c6472]' value="Google Cloud Platform">Google Cloud Platform</option>
                    <option class='hover:bg-[#2c6472]' value="Terraform">Terraform</option>
                    <option class='hover:bg-[#2c6472]' value="Ansible">Ansible</option>
                    <option class='hover:bg-[#2c6472]' value="System Design Basics">System Design Basics</option>
                    <option class='hover:bg-[#2c6472]' value="Microservices Architecture">Microservices Architecture</option>
                    <option class='hover:bg-[#2c6472]' value="Event-Driven Design">Event-Driven Design</option>
                    <option class='hover:bg-[#2c6472]' value="Message Brokers (RabbitMQ, Kafka)">Message Brokers (RabbitMQ, Kafka)</option>
                    <option class='hover:bg-[#2c6472]' value="Software Documentation">Software Documentation</option>
                    <option class='hover:bg-[#2c6472]' value="UML Diagrams">UML Diagrams</option>
                    <option class='hover:bg-[#2c6472]' value="ER Diagrams">ER Diagrams</option>
                    <option class='hover:bg-[#2c6472]' value="System Monitoring">System Monitoring</option>
                    <option class='hover:bg-[#2c6472]' value="Prometheus">Prometheus</option>
                    <option class='hover:bg-[#2c6472]' value="Grafana">Grafana</option>
                    <option class='hover:bg-[#2c6472]' value="New Relic">New Relic</option>
                    <option class='hover:bg-[#2c6472]' value="Sentry">Sentry</option>
                    <option class='hover:bg-[#2c6472]' value="Load Testing">Load Testing</option>
                    <option class='hover:bg-[#2c6472]' value="Performance Tuning">Performance Tuning</option>
                    <option class='hover:bg-[#2c6472]' value="Scalability Planning">Scalability Planning</option>
                    <option class='hover:bg-[#2c6472]' value="High Availability Setups">High Availability Setups</option>
                    <option class='hover:bg-[#2c6472]' value="Backup & Disaster Recovery">Backup & Disaster Recovery</option>
                    <option class='hover:bg-[#2c6472]' value="Network Protocols (HTTP, TCP/IP, DNS)">Network Protocols (HTTP, TCP/IP, DNS)</option>
                    <option class='hover:bg-[#2c6472]' value="Cybersecurity Basics">Cybersecurity Basics</option>
                    <option class='hover:bg-[#2c6472]' value="Encryption Techniques">Encryption Techniques</option>
                    <option class='hover:bg-[#2c6472]' value="Secure Coding">Secure Coding</option>
                    <option class='hover:bg-[#2c6472]' value="Access Control">Access Control</option>
                    <option class='hover:bg-[#2c6472]' value="Penetration Testing">Penetration Testing</option>
                    <option class='hover:bg-[#2c6472]' value="Code Reviews">Code Reviews</option>
                    <option class='hover:bg-[#2c6472]' value="Pair Programming">Pair Programming</option>
                    <option class='hover:bg-[#2c6472]' value="Container Orchestration">Container Orchestration</option>
                    <option class='hover:bg-[#2c6472]' value="Environment Configuration">Environment Configuration</option>
                    <option class='hover:bg-[#2c6472]' value="Cross-Platform Compatibility">Cross-Platform Compatibility</option>
                    <option class='hover:bg-[#2c6472]' value="Mobile Responsiveness">Mobile Responsiveness</option>
                    <option class='hover:bg-[#2c6472]' value="Browser Debugging Tools">Browser Debugging Tools</option>
                    <option class='hover:bg-[#2c6472]' value="Accessibility Standards">Accessibility Standards</option>
                    <option class='hover:bg-[#2c6472]' value="SEO Basics">SEO Basics</option>
                    <option class='hover:bg-[#2c6472]' value="API Versioning">API Versioning</option>
                    <option class='hover:bg-[#2c6472]' value="Code Refactoring">Code Refactoring</option>
                    <option class='hover:bg-[#2c6472]' value="Feature Toggles">Feature Toggles</option>
                    <option class='hover:bg-[#2c6472]' value="Release Management">Release Management</option>
                    <option class='hover:bg-[#2c6472]' value="Rollback Strategies">Rollback Strategies</option>
                    <option class='hover:bg-[#2c6472]' value="Dependency Management">Dependency Management</option>
                    <option class='hover:bg-[#2c6472]' value="Continuous Learning">Continuous Learning</option>
                    <option class='hover:bg-[#2c6472]' value="Open-Source Contribution">Open-Source Contribution</option>
                    <option class='hover:bg-[#2c6472]' value="Technical Research">Technical Research</option>
                    <option class='hover:bg-[#2c6472]' value="Documentation Review">Documentation Review</option>
                  </select>

                  <button
                    type="button"
                    onClick={addSkill}
                    className=" px-4 py-2 border-2 border-[#2c6472] text-[#2c6472] h-[41px] text-sm font-medium bg-white hover:scale-95 transition-transform ease-linear  duration-200 ml-2"
                  >
                    +Add Skill
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 h-[80px]  overflow-y-auto p-2 rounded ">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 h-8 px-3 py-1 text-gray-500 rounded-full flex items-center"
                    >
                      <span className="mr-2">{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="text-gray-500 hover:text-red-500 focus:outline-none"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

              </div>

              {/* Annual Income */}
              <div className="relative mb-2">
                <input
                id='annual_income'
                  type="text"
                  name="annual_income"
                  placeholder=" "
                  value={formData.annual_income}
                  onChange={handleChange}
                  className="peer w-full p-4 border border-gray-300 h-[41px] text-gray-500 text-base focus:outline-none focus:ring-1 focus:ring-[#2c6472]"
                />
                   <label
                   htmlFor='annual_income'
                  className={`absolute left-4 transition-all text-gray-500 text-sm ${formData.annual_income
                    ? '-top-2 text-sm bg-white px-1'
                    : 'top-2.5 text-base peer-focus:-top-2 peer-focus:text-sm peer-focus:bg-white peer-focus:px-1'
                    }`}
                >
                  Desired Income 
                </label>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-5 ">
                <button
                  type="button"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white w-[100px] h-[41px] rounded-full focus:outline-none"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="teal-button px-6 py-2 bg-[#2c6472] text-white  h-[41px] w-[100px] rounded-full focus:outline-none"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-[#2c6472] flex flex-col justify-center items-center p-4 text-white rounded-e-xl">
          <div className="flex justify-center items-center gap-2">
            <img src={joblogo} className="h-6 w-6" />
            <h3 className="text-[#ff9a67] text-xl m-0">JSE AI</h3>
          </div>
          <div className="text-center mt-4">
            <h3 className="text-white text-lg font-medium mb-4">Professional summary</h3>
          </div>
          <div className='relative mb-5 flex justify-center items-center ms-4'>
            <img src={frame} alt="" className='relative object-cover ' />
            <DotLottieReact
              src="https://lottie.host/5968740b-6c7a-4ce0-8e43-808c202722ae/P3fww1TqS8.lottie"
              loop
              autoplay
              style={{ width: "350px", height: "350px" }}
              className='absolute object-cover me-2 p-2'
            />
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default ProfessionalSummary;
