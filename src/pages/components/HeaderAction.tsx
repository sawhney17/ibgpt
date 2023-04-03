import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  rem,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { auth, signInWithGoogle } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

interface HeaderActionProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

function HeaderAction({ links }: HeaderActionProps) {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [loggedIn, setloggedIn] = useState(false);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      setloggedIn(true);
      // @ts-expect-error
      setProfileLink(user.reloadUserInfo.providerUserInfo[0].photoUrl)
    } else {
      setloggedIn(false);
    }
  });
  const [profileLink, setProfileLink] = useState("");
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              // onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={rem(12)} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        // onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={30}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          {/* <MantineLogo size={28} /> */}
          {/* <img></img> */}
          {/* Create a fancy text based logo */}
          <Text
            color="ocean-blue"
            size="x-large"
            style={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            IBGPT
          </Text>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        {loggedIn ? (
          <img
            src={profileLink}
            alt="Profile"
            style={{ height: "3rem", borderRadius: "100px" }}
          />
          // <Button
          //   radius="xl"
          //   h={30}
          //   // onClick={() => {
          //   //   signInWithGoogle();
          //   // }}
          // >
          //   Profile
          // </Button>
        ) : (
          <Button
            radius="xl"
            h={30}
            onClick={() => {
              signInWithGoogle();
            }}
          >
            Login/Signup
          </Button>
        )}
      </Container>
    </Header>
  );
}

export default React.memo(HeaderAction);
