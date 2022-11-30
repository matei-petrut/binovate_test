export interface NewChatModalState {
  isOpen: boolean;
  onSubmit?: (data?: string) => void;
  onClose?: () => void;
  placeholder?: string;
}