const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and web development.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: false,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

const courseGrid = document.getElementById("course-grid");
const creditsTotal = document.getElementById("credits-total");
const filterButtons = document.querySelectorAll(".filter-bar button");

function renderCourses(list) {
  courseGrid.innerHTML = "";
  list.forEach((course) => {
    const card = document.createElement("div");
    card.classList.add("course");
    if (course.completed) card.classList.add("completed");
    card.textContent = `${course.subject} ${course.number}`;
    card.setAttribute(
      "aria-label",
      `${course.subject} ${course.number}: ${course.title}${course.completed ? " (completed)" : ""}`
    );
    courseGrid.appendChild(card);
  });

  const total = list.reduce((sum, course) => sum + course.credits, 0);
  creditsTotal.textContent =
    `The total credits for the ${list.length} course${list.length === 1 ? "" : "s"} listed above is ${total}`;
}

function filterCourses(filter) {
  if (filter === "all") return courses;
  return courses.filter((course) => course.subject === filter);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    renderCourses(filterCourses(button.dataset.filter));
  });
});

renderCourses(courses);
