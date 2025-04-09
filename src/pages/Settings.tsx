import { Tabs, Box, Card } from "@radix-ui/themes";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import useAppStore from "../stores/appStore";

const Personility = () => {
  return (
    <Card size="3" style={{ padding: "20px" }}>
      <div>Personality</div>
    </Card>
  );
};

const WhisperModel = () => {
  return (
    <Card size="3" style={{ padding: "20px" }}>
      <div>Whisper Model</div>
    </Card>
  );
};

const AboutMe = () => {
  return (
    <Card size="3" style={{ padding: "20px" }}>
      <div>About Me</div>
    </Card>
  );
};

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split('/').pop() || 'personality';
  const { theme } = useAppStore();


  console.log(currentTab, theme);
  return (
    <Box>
        <Tabs.Root value={currentTab} onValueChange={(value) => navigate(`/settings/${value}`)}>
          <Tabs.List>
            <Tabs.Trigger value="personality">Personality</Tabs.Trigger>
            <Tabs.Trigger value="model">Model</Tabs.Trigger>
            <Tabs.Trigger value="about">About Us</Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>

        <Box mt="4">
          <Routes>
            <Route path="/" element={<Navigate to="/settings/personality" replace />} />
            <Route path="/personality" element={<Personility />} />
            <Route path="/model" element={<WhisperModel />} />
            <Route path="/about" element={<AboutMe />} />
          </Routes>
        </Box>
      </Box>
  );
};

export default Settings;
