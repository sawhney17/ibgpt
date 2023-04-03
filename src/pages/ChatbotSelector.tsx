// Import react
import React from "react";
import { BadgeCard } from "./components/GridCard";
import { Grid } from "@mantine/core";
import { HeaderAction } from "./components/HeaderAction";

// Initialize the component
const links = [
  {
    link: "/about",
    label: "Features",
  },
  {
    link: "#1",
    label: "Learn",
    links: [],
  },
  {
    link: "/about",
    label: "About",
  },
  {
    link: "/pricing",
    label: "Pricing",
  },
  {
    link: "#2",
    label: "Support",
  },
];
export default function ChatbotSelector() {
  return (
    <div>

      {/* CReate a simple tabular UI through mantine UI that gives the option to select from a variety of cards consisting of differnet textbooks  */}

      {/* Put this  */}
      <HeaderAction links={links}></HeaderAction>

      {/*  */}
      <Grid px={50}>
        <Grid.Col span={12} xs={4} xl={
          3
        }>
          <BadgeCard
            image="https://m.media-amazon.com/images/I/818SlCKewDL._AC_UF1000,1000_QL80_.jpg"
            title="Economics for the IB Diploma: Coursebook. Third edition"
            id={1}
            author="Ellie Tragakes"
            // description="This new edition of Economics for the IB Diploma has been fully updated to match the latest syllabus for first examination in 2021. Written by an experienced IB Economics teacher, this textbook provides comprehensive and accessible coverage of the syllabus content. It includes a wide range of international case studies and examples, and is packed with engaging activities to help students apply their knowledge and develop the skills they need to succeed."
            // badges={[
            //   { emoji: "🏆", label: "Bestseller" },
            //   { emoji: "📚", label: "Education" },
            //   { emoji: "📖", label: "Reference" },
            // ]}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}
