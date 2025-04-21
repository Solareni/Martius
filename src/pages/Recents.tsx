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

	// 三列均匀分布的宽度配置
	const columnWidths = ["33.33%", "33.33%", "33.33%"];

	return (
		<Flex direction="column" gap="4" p="4" width="100%">
			<TextField.Root
				placeholder="搜索录音..."
				value={searchQuery}
				onChange={handleSearchChange}
			/>

			<Text size="2" color="gray">
				共 {filteredRecordings.length} 条录音
			</Text>

			<Box className="w-full h-[500px]">
				<TableVirtuoso
					className="w-full"
					style={{ width: "100%" }}
					data={filteredRecordings}
					components={{
						Table: ({ style, ...props }) => (
							<Table.Root 
								{...props} 
								variant="surface" 
								size="2"
								style={{ ...style, width: "100%" }}
								className="w-full"
							/>
						),
						TableHead: Table.Header,
						TableRow: Table.Row,
						TableBody: ({ style, ...props }) => (
							<tbody {...props} style={{ ...style, width: "100%" }} className="w-full" />
						),
						EmptyPlaceholder: () => (
							<div style={{ padding: "1rem", textAlign: "center" }}>
								No records found
							</div>
						)
					}}
					fixedHeaderContent={() => (
						<Table.Row className="w-full">
							<Table.ColumnHeaderCell style={{ width: columnWidths[0] }}>
								文件
							</Table.ColumnHeaderCell>
							<Table.ColumnHeaderCell style={{ width: columnWidths[1] }}>
								时长
							</Table.ColumnHeaderCell>
							<Table.ColumnHeaderCell style={{ width: columnWidths[2] }}>
								创建时间
							</Table.ColumnHeaderCell>
						</Table.Row>
					)}
					itemContent={(index, recording) => (
						<>
							<Table.Cell style={{ width: columnWidths[0] }}>
								{recording.fileName}
							</Table.Cell>
							<Table.Cell style={{ width: columnWidths[1] }}>
								{formatDuration(recording.duration)}
							</Table.Cell>
							<Table.Cell style={{ width: columnWidths[2] }}>
								{new Date(recording.createdAt).toLocaleString()}
							</Table.Cell>
						</>
					)}
				/>
			</Box>
		</Flex>
	);
};

export default Recents;
