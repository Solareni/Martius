import { useState, ChangeEvent } from "react";
import { Flex, TextField, Text, Table, Box } from "@radix-ui/themes";
import { TableVirtuoso } from "react-virtuoso";

interface Recording {
	id: string;
	fileName: string;
	duration: number;
	createdAt: string;
	progress?: number;
}

const mockRecordings: Recording[] = [
	{
		id: "1",
		fileName: "会议记录_20240410.mp3",
		duration: 1254,
		createdAt: "2024-04-10T08:30:00",
		progress: 0.5,
	},
	{
		id: "2",
		fileName: "客户访谈_20240409.mp3",
		duration: 1860,
		createdAt: "2024-04-09T14:15:00",
		progress: 0.8,
	},
	{
		id: "3",
		fileName: "团队讨论_20240408.mp3",
		duration: 2450,
		createdAt: "2024-04-08T10:00:00",
		progress: 0.2,
	},
];

const formatDuration = (seconds: number) => {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const Recents = () => {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredRecordings = mockRecordings.filter((r) =>
		r.fileName.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	return (
		<Flex direction="column" gap="4" p="4">
			<TextField.Root
				placeholder="搜索录音..."
				value={searchQuery}
				onChange={handleSearchChange}
			/>

			<Text size="2" color="gray">
				共 {filteredRecordings.length} 条录音
			</Text>

			<Box style={{ height: "500px", width: "100%" }}>
				<TableVirtuoso
					data={filteredRecordings}
					fixedHeaderContent={() => (
						<Table.Root style={{ width: "100%" }}>
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeaderCell style={{ flex: 1 }}>
										文件
									</Table.ColumnHeaderCell>
									<Table.ColumnHeaderCell style={{ flex: 1 }}>
										时长
									</Table.ColumnHeaderCell>
									<Table.ColumnHeaderCell style={{ flex: 1 }}>
										创建时间
									</Table.ColumnHeaderCell>
								</Table.Row>
							</Table.Header>
						</Table.Root>
					)}
					itemContent={(index, recording) => (
						<Table.Row>
							<Table.RowHeaderCell style={{ flex: 1 }}>
								{recording.fileName}
							</Table.RowHeaderCell>
							<Table.Cell style={{ flex: 1 }}>
								{formatDuration(recording.duration)}
							</Table.Cell>
							<Table.Cell style={{ flex: 1 }}>
								{new Date(recording.createdAt).toLocaleString()}
							</Table.Cell>
						</Table.Row>
					)}
				/>
			</Box>
		</Flex>
	);
};

export default Recents;
