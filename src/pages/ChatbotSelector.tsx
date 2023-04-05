// Import react
import { BadgeCard } from "./components/GridCard";
import { Grid } from "@mantine/core";
import HeaderAction from "./components/HeaderAction";

// Initialize the component
export const links = [
  // {
  //   link: "/about",
  //   label: "Features",
  // },
  // {
  //   link: "#1",
  //   label: "Learn",
  //   links: [],
  // },
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/chats",
    label: "Chats",
  },
  
  // {
  //   // Mailto url
  //   link: "mailto:sawhney@aryansawhney.com",
  //   label: "Support",
  // },
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
            id="econTragakes"
            author={["Ellie Tragakes"]}
            // description="This new edition of Economics for the IB Diploma has been fully updated to match the latest syllabus for first examination in 2021. Written by an experienced IB Economics teacher, this textbook provides comprehensive and accessible coverage of the syllabus content. It includes a wide range of international case studies and examples, and is packed with engaging activities to help students apply their knowledge and develop the skills they need to succeed."
            // badges={[
            //   { emoji: "🏆", label: "Bestseller" },
            //   { emoji: "📚", label: "Education" },
            //   { emoji: "📖", label: "Reference" },
            // ]}
          />
          </Grid.Col>
          <Grid.Col span={12} xs={4} xl={
            3
          }>
          <BadgeCard
            image="https://m.media-amazon.com/images/I/91JLJ+dZOUL._AC_UF1000,1000_QL80_.jpg"
            title="Core Computer Science for the IB Diploma Program"
            id="coreComputerscience"
            author={["Kostas Dimitriou", "Markos Hatzitaskos"]}
            // description="This new edition of Economics for the IB Diploma has been fully updated to match the latest syllabus for first examination in 2021. Written by an experienced IB Economics teacher, this textbook provides comprehensive and accessible coverage of the syllabus content. It includes a wide range of international case studies and examples, and is packed with engaging activities to help students apply their knowledge and develop the skills they need to succeed."
            // badges={[
            //   { emoji: "🏆", label: "Bestseller" },
            //   { emoji: "📚", label: "Education" },
            //   { emoji: "📖", label: "Reference" },
            // ]}
          />
          </Grid.Col>
          <Grid.Col span={12} xs={4} xl={
            3
          }>
          <BadgeCard
            image="https://m.media-amazon.com/images/I/91QepeG6+5L._AC_UF1000,1000_QL80_.jpg"
            title="Advanced Computer Science for the IB Diploma Program"
            id="advancedComputerscience"
            author={["Kostas Dimitriou", "Markos Hatzitaskos"]}
            // description="This new edition of Economics for the IB Diploma has been fully updated to match the latest syllabus for first examination in 2021. Written by an experienced IB Economics teacher, this textbook provides comprehensive and accessible coverage of the syllabus content. It includes a wide range of international case studies and examples, and is packed with engaging activities to help students apply their knowledge and develop the skills they need to succeed."
            // badges={[
            //   { emoji: "🏆", label: "Bestseller" },
            //   { emoji: "📚", label: "Education" },
            //   { emoji: "📖", label: "Reference" },
            // ]}
          />
        </Grid.Col>
        <Grid.Col span={12} xs={4} xl={
          3
        }>
          <BadgeCard
            image="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/51Re077+w2L._AC_UF1000,1000_QL80_.jpg"
            title="DP Business Management Course Book 2022"
            id="businessManagement"
            author={["Lokyie Lomine", "Martin Mwenda Muchena", "Robert Pierce"]}
            // description="This new edition of Economics for the IB Diploma has been fully updated to match the latest syllabus for first examination in 2021. Written by an experienced IB Economics teacher, this textbook provides comprehensive and accessible coverage of the syllabus content. It includes a wide range of international case studies and examples, and is packed with engaging activities to help students apply their knowledge and develop the skills they need to succeed."
            // badges={[
            //   { emoji: "🏆", label: "Bestseller" },
            //   { emoji: "📚", label: "Education" },
            //   { emoji: "📖", label: "Reference" },
            // ]}
          />
      </Grid.Col>
      <Grid.Col span={12} xs={4} xl={
          3
        }>
          <BadgeCard
            image="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61lrZ7w-zsL._AC_UF1000,1000_QL80_.jpg"
            title="A doll's house"
            id="adollshouse"
            author={["Henrik Ibsen"]}
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
