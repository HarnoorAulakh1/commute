"use client";
import img from "../../../../public/img.webp";
import Card from "./card";
import { motion } from "framer-motion";
const data = [
  {
    image: img,
    review:
      "A must-have tool for any professional. It's revolutionized the way we approach problem-solving and decision-making.",
    name: "Grace Hill",
    position: "Senior Consultant",
  },
  {
    image: img,
    review:
      "A must-have tool for any professional. It's revolutionized the way we approach problem-solving and decision-making.",
    name: "Grace Hill",
    position: "Senior Consultant",
  },
  {
    image: img,
    review:
      "A must-have tool for any professional. It's revolutionized the way we approach problem-solving and decision-making.",
    name: "Grace Hill",
    position: "Senior Consultant",
  },
  {
    image: img,
    review:
      "A must-have tool for any professional. It's revolutionized the way we approach problem-solving and decision-making.",
    name: "Grace Hill",
    position: "Senior Consultant",
  },
  {
    image: img,
    review:
      "A must-have tool for any professional. It's revolutionized the way we approach problem-solving and decision-making.",
    name: "Grace Hill",
    position: "Senior Consultant",
  },
  {
    image: img,
    review:
      "A must-have tool for any professional. It's revolutionized the way we approach problem-solving and decision-making.",
    name: "Grace Hill",
    position: "Senior Consultant",
  },
  {
    image: img,
    review:
      "A must-have tool for any professional. It's revolutionized the way we approach problem-solving and decision-making.",
    name: "Grace Hill",
    position: "Senior Consultant",
  },
  {
    image: img,
    review:
      "A must-have tool for any professional. It's revolutionized the way we approach problem-solving and decision-making.",
    name: "Grace Hill",
    position: "Senior Consultant",
  },
];

function Review() {
  //   const { scrollYProgress } = useScroll();
  //   const y2 = useTransform(scrollYProgress, [0, 1], ["0", "-20%"]);
  //   const y1 = useTransform(scrollYProgress, [0, 1], ["-100%", "-70%"]);
  return (
    <div className="fade1 bg-black relative flex justify-center items-center">
      <div className="flex flex-row gap-4 rounded-lg z-[5] w-max m-auto h-[40rem] overflow-hidden no-scrollbar p-5">
        <motion.div
          //style={{ y: y2 }}
          initial={{ y: 0 }}
          animate={{ y: "-118.5%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="flex flex-col items-center gap-2"
        >
          {data.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              position={item.position}
              review={item.review}
              image={item.image}
            />
          ))}
        </motion.div>
        <motion.div
          //style={{ y: y1 }}
          initial={{ y: "0" }}
          animate={{ y: "-118.5%" }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="flex flex-col items-center gap-2"
        >
          {data.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              position={item.position}
              review={item.review}
              image={item.image}
            />
          ))}
        </motion.div>
        <motion.div
          //style={{ y: y2 }}
          initial={{ y: 0 }}
          animate={{ y: "-118.5%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="flex flex-col items-center gap-2"
        >
          {data.map((item, index) => (
            <Card
              key={index}
              name={item.name}
              position={item.position}
              review={item.review}
              image={item.image}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Review;
