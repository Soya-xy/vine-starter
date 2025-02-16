export function useCopy() {
  const clipboard = useClipboard({ legacy: true })

  watch(clipboard.copied, (copied) => {
    if (copied) {
      // TODO: 复制成功弹窗
    }
  })

  return clipboard
}
