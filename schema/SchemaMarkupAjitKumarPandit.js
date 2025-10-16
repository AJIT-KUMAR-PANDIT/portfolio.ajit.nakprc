import Script from "next/script";

const SchemaMarkupAjitKumarPandit = () => {
  const schemaData = {
    "@context": "https://schema.org/",
    "@type": ["Thing", "Person"],
    "@id": "https://ajitkumarpandit.nakprc.com/#ajitkumarpandit",
    sameAs: [
      "https://x.com/AjitKrPandit",
      "https://twitter.com/AjitKrPandit",
      "https://www.linkedin.com/in/ajitkumarpandit",
      "https://www.facebook.com/AjitKumarPanditOfficial",
      "https://www.instagram.com/ajit.kumar.pandit",
      "https://github.com/AJIT-KUMAR-PANDIT",
      "https://www.threads.net/@ajit.kumar.pandit",
      "https://www.pinterest.com/ajitkrpandit",
      "https://www.youtube.com/@AJIT-KUMAR-PANDIT",
      "https://www.google.com/search?q=Ajit+Kumar+Pandit&kgmid=/g/11krx0sx_t",
      "https://ajitkumarpandit.nakprc.com",
      "https://ajit.nakprc.com",
    ],
    name: "Ajit Kumar Pandit",
    givenName: "Ajit",
    familyName: "Pandit",
    additionalName: "Kumar",
    image: {
      "@type": "ImageObject",
      url: "https://ajitkumarpandit.nakprc.com/ajitkumarpandit/ajitkumarpandit.png",
      caption: "Ajit Kumar Pandit - Full Stack Web Developer",
    },
    url: "https://ajitkumarpandit.nakprc.com",
    jobTitle: "Full Stack Developer",
    description:
      "Ajit Kumar Pandit is a passionate Full Stack Web Developer with expertise in both front-end and back-end technologies. He specializes in creating robust, scalable applications using modern frameworks and best practices.",
    knowsAbout: [
      "Full Stack Development",
      "Web Development",
      "Front-end Development",
      "Back-end Development",
      "Database Management",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Full Stack Developer",
      occupationalCategory: "15-1254",
      //   estimatedSalary: {
      //     "@type": "MonetaryAmountDistribution",
      //     name: "Full Stack Developer Salary",
      //     currency: "INR",
      //     percentile10: "800000",
      //     percentile90: "2000000",
      //     percentile25: "1000000",
      //     median: "1400000",
      //     percentile75: "1700000",
      //     duration: "P1Y",
      //   },
      occupationLocation: {
        "@type": "Country",
        name: "India",
      },
      description:
        "As a Full Stack Developer, Ajit Kumar Pandit is responsible for developing and maintaining both client-side and server-side applications, working with various technologies and frameworks to create efficient and scalable web solutions.",
      skills: [
        "JavaScript",
        "HTML",
        "CSS",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Next.js",
        "TailwindCSS",
        "Git",
        "CapicitorJs",
      ],
    },
    worksFor: {
      "@type": "Organization",
      name: "Self-employed",
    },
    email: "ajit@nakprc.com",
    gender: "Male",
    nationality: {
      "@type": "Country",
      name: "India",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Chandigarh University",
        sameAs: "https://www.cuchd.in/",
      },
      {
        "@type": "EducationalOrganization",
        name: "Nettur Technical Training Foundation",
        sameAs: "https://www.nttftrg.com/",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "India",
    },
    knowsLanguage: ["English", "Hindi"],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://ajitkumarpandit.nakprc.com",
    },
  };

  return (
    <Script
      id="schema-ajit-kumar-pandit"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default SchemaMarkupAjitKumarPandit;
