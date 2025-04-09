import { Tabs, Box, Card, Flex, Text, Select } from "@radix-ui/themes";
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from "react-router-dom";
import useAppStore from "../stores/appStore";
import WhisperModel from "./WhipserModel";

const Personility = () => {
	const { theme, setTheme, language, setLanguage } = useAppStore();

	return (
		<Card size="3" style={{ padding: "20px" }}>
			<Flex direction="column" gap="4">
				<Text size="5" weight="bold">
					主题设置
				</Text>
				<Select.Root
					value={theme}
					onValueChange={(value) => setTheme(value as "light" | "dark")}
				>
					<Select.Trigger />
					<Select.Content>
						<Select.Item value="light">明亮模式</Select.Item>
						<Select.Item value="dark">暗黑模式</Select.Item>
					</Select.Content>
				</Select.Root>

				<Text size="5" weight="bold">
					语言设置
				</Text>
				<Select.Root value={language} onValueChange={setLanguage}>
					<Select.Trigger />
					<Select.Content>
						<Select.Item value="en">English</Select.Item>
						<Select.Item value="zh">中文</Select.Item>
					</Select.Content>
				</Select.Root>
			</Flex>
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
	const currentTab = location.pathname.split("/").pop() || "personality";
	return (
		<Box>
			<Tabs.Root
				value={currentTab}
				onValueChange={(value) => navigate(`/settings/${value}`)}
			>
				<Tabs.List>
					<Tabs.Trigger value="personality">Personality</Tabs.Trigger>
					<Tabs.Trigger value="model">Model</Tabs.Trigger>
					<Tabs.Trigger value="about">About Us</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>

			<Box mt="4">
				<Routes>
					<Route
						path="/"
						element={<Navigate to="/settings/personality" replace />}
					/>
					<Route path="/personality" element={<Personility />} />
					<Route path="/model" element={<WhisperModel />} />
					<Route path="/about" element={<AboutMe />} />
				</Routes>
			</Box>
		</Box>
	);
};

export default Settings;
