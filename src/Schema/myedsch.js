import Script from 'next/script';

const schemaMarkup = () => {
    const schemaData = {
        "@context": "https://schema.org/",
        "@type": ["Person"],
        "@id": "https://ajitkumarpandit.nakprc.com/#ajitkumarpandit",
        "sameAs": [
            "https://x.com/AjitKrPandit",
            "https://twitter.com/AjitKrPandit",
            "https://www.linkedin.com/in/ajitkumarpandit",
            "https://www.facebook.com/AjitKumarPanditOfficial",
            "https://www.instagram.com/ajit.kumar.pandit",
            "https://github.com/AJIT-KUMAR-PANDIT",
            "https://www.threads.net/@ajit.kumar.pandit",
            "https://www.pinterest.com/ajitkrpandit",
            "https://www.youtube.com/@AJIT-KUMAR-PANDIT"
        ],
        "name": "Ajit Kumar Pandit",
        "givenName": "Ajit",
        "familyName": "Pandit",
        "additionalName": "Kumar",
        "image": {
            "@type": "ImageObject",
            "url": "https://ajitkumarpandit.nakprc.com/myGalleryPics/ajitkumarpandit.png",
            "caption": "Ajit Kumar Pandit - Full Stack Web Developer"
        },
        "url": "https://ajitkumarpandit.nakprc.com",
        "jobTitle": "Full Stack Web Developer",
        "description": "Ajit Kumar Pandit is a passionate Full Stack Web Developer with expertise in both front-end and back-end technologies. He specializes in creating robust, scalable web applications using modern frameworks and best practices.",
        "knowsAbout": ["Web Development", "Front-end Development", "Back-end Development", "Database Management"],
        "hasOccupation": {
            "@type": "Occupation",
            "name": "Full Stack Web Developer",
            "occupationCategory": "15-1254.00",
            "occupationalCategory": "Web Developers",
            "skills": [
                "JavaScript", "HTML", "CSS", "React", "Node.js", "Express.js",
                "MongoDB", "Next.js", "TailwindCss", "Git", "Ionic React"
            ]
        },
        "worksFor": {
            "@type": "Organization",
            "name": "Self-employed"
        },
        "email": "ajit@nakprc.com",
        "gender": "Male",
        "nationality": {
            "@type": "Country",
            "name": "India"
        },
        "alumniOf": [
            {
                "@type": "EducationalOrganization",
                "name": "Chandigarh University",
                "sameAs": "https://www.cuchd.in/"
            },
            {
                "@type": "EducationalOrganization",
                "name": "Nettur Technical Training Foundation",
                "sameAs": "https://www.nttftrg.com/"
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "India"
        },
        "knowsLanguage": ["English", "Hindi"],
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://ajitkumarpandit.nakprc.com"
        }
    };

    return (
        <Script
            id="schema-ajit-kumar-pandit"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
};

export default schemaMarkup;