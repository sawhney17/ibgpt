import { IconHeart, IconLock, IconLockAccess } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  rem,
  Flex,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface BadgeCardProps {
  image: string;
  title: string;
  author: string[];
  id: string;
//   description: string;
//   badges: {
//     emoji: string;
//     label: string;
//   }[];
}

export function BadgeCard({
  image,
  title,
//   description,
  author,
//   badges,
  id,
}: BadgeCardProps) {
  const { classes, theme } = useStyles();

  const navigate = useNavigate();
//   const features = badges.map((badge) => (
//     <Badge
//       color={theme.colorScheme === "dark" ? "dark" : "gray"}
//       key={badge.label}
//       leftSection={badge.emoji}
//     >
//       {badge.label}
//     </Badge>
//   ));
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  });
}, []);

const [loggedin, setLoggedin] = React.useState(false);

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      {/* Vertical sections */}
      <Card.Section>
        <Image src={image} alt={title} height={400} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>

          {/* <Badge size="sm">{author}</Badge> */}
          {
            author.map((author) => (
              <Badge size="sm">{author}</Badge>
            ))
          }
        </Group>
        {/* <Text fz="sm" mt="xs">
          {description}
        </Text> */}
      </Card.Section>
      {/* 
      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Perfect for you, if you enjoy
        </Text>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section> */}

      <Group mt="xs">
        <Button
          radius="md"
          style={{ flex: 1 }}
          onClick={() => {
            console.log("Chat with " + id);
            navigate("/chatui?chatbot=" + id);
          }}
        >

          {loggedin ? "Start Chat" : <><IconLock></IconLock>    Login to Chat</>}
        </Button>
        {/* <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
        </ActionIcon> */}
      </Group>
    </Card>
  );
}
