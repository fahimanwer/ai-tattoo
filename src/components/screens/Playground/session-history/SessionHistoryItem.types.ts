export type SessionHistoryItemProps = {
  uri: string;
  imageCount?: number; // Optional: shows the number of images in the group
  onSave: () => void;
  onShare: () => void;
  onDelete: () => void;
  onSelect: () => void;
  isActive: boolean;
  onPress: () => void;
};
