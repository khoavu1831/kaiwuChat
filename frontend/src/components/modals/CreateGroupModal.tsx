import React, { useState } from 'react';
import { useConversationStore } from '../../stores/useConversationStore';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateGroupModal({ isOpen, onClose }: CreateGroupModalProps) {
  const [groupName, setGroupName] = useState('');
  const { createGroupConversation, creating } = useConversationStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName.trim()) return;

    try {
      await createGroupConversation(groupName);
      setGroupName('');
      onClose();
    } catch (error) {
      console.error('Failed to create group:', error);
      // TODO: Show toast notification
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-basecolor rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Tạo nhóm mới</h2>
          <button
            onClick={onClose}
            className="text-[#666880] hover:text-white transition-colors"
          >
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white text-sm mb-2 block">Tên nhóm</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Nhập tên nhóm..."
              className="
                w-full bg-[#2c2e42] rounded-lg p-3
                text-white outline-none
                focus:ring-2 focus:ring-brandcolor
              "
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="
                flex-1 py-3 rounded-lg
                bg-[#2c2e42] text-white
                hover:bg-[#3c3e52] transition-colors
              "
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={!groupName.trim() || creating}
              className="
                flex-1 py-3 rounded-lg
                bg-brandcolor text-white font-medium
                hover:bg-brandcolor/80 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2
              "
            >
              {creating ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Đang tạo...
                </>
              ) : (
                'Tạo nhóm'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGroupModal;
