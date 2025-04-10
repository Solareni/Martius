import {
	Box,
	Card,
	Text,
	Flex,
	RadioGroup,
	TextArea,
	TextField,
	Button,
} from "@radix-ui/themes";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
const WhisperModel = () => {
	const [ffmpegPath, setFfmpegPath] = useState<string>("");

    useEffect(() => {
        // Call which_ffmpeg when component mounts
        invoke<string | null>("which_ffmpeg")
            .then((path) => {
                if (path) {
                    setFfmpegPath(path);
                }
            })
            .catch(console.error);
    }, []);
	return (
		<Card size="3" style={{ padding: "20px" }}>
			<Box mb="4">
				<Text as="div" size="2" mb="1" weight="bold">
					FFmpeg路径
				</Text>
				<Flex gap="3">
					<TextField.Root
						style={{ flex: 1 }}
						placeholder="FFmpeg可执行文件路径"
						value={ffmpegPath}
					>
						<TextField.Slot />
					</TextField.Root>
					<Button>导入</Button>
				</Flex>
			</Box>

			<Box mb="4">
				<Text as="div" size="2" mb="1" weight="bold">
					模型路径
				</Text>
				<Flex gap="3">
					<TextField.Root style={{ flex: 1 }} placeholder="Whisper模型文件路径">
						<TextField.Slot />
					</TextField.Root>
					<Button>导入</Button>
				</Flex>
			</Box>

			<Box mb="4">
				<Text as="div" size="2" mb="1" weight="bold">
					运行模式
				</Text>
				<RadioGroup.Root defaultValue="cpu">
					<Flex gap="3">
						<Text as="label" size="2">
							<Flex gap="2">
								<RadioGroup.Item value="cpu" /> CPU模式
							</Flex>
						</Text>
						<Text as="label" size="2">
							<Flex gap="2">
								<RadioGroup.Item value="gpu" /> GPU模式
							</Flex>
						</Text>
					</Flex>
				</RadioGroup.Root>
			</Box>

			<Box>
				<Text as="div" size="2" mb="1" weight="bold">
					提示词
				</Text>
				<TextArea
					placeholder="输入自定义提示词"
					style={{ minHeight: "100px" }}
				/>
			</Box>
		</Card>
	);
};

export default WhisperModel;
