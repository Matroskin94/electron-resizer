import { ChangeEvent, forwardRef, PropsWithChildren } from 'react'

interface IUploadFileInputInput {
  name: string
  multiple?: boolean
  acceptType?: string
  onChange: (files: File[]) => void | Promise<void>
  onBeforeChange?: (files: File[]) => void | Promise<void>
}

export const UploadFileInput = forwardRef<
  HTMLInputElement,
  PropsWithChildren<IUploadFileInputInput>
>(
  (
    { name, multiple = false, acceptType, children, onBeforeChange, onChange },
    fileInputRef
  ) => {
    const onFileChange = async ({ target }: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(target.files || [])
      await onBeforeChange?.(files)

      onChange(files)
      target.value = ''
    }

    return (
      <label htmlFor={name}>
        <input
          ref={fileInputRef}
          accept={acceptType}
          id={name}
          multiple={multiple}
          type='file'
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
        {children}
      </label>
    )
  }
)
