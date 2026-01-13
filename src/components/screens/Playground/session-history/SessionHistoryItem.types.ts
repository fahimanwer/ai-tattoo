export type SessionHistoryItemProps = {
  uri: string;
  secondUri?: string; // Optional: second image URI for stacked preview
  imageCount?: number; // Optional: shows the number of images in the group
  onSave: () => void;
  onShare: () => void;
  onDelete: () => void;
  onSelect: () => void;
  isActive: boolean;
  onPress: () => void;
};
