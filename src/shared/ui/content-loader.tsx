import { cx } from "yummies/css"


export const ContentLoader = ({ className }: { className?: string }) => {
  return (
    <div className={cx('absolute inset-0 size-full flex flex-col gap-4', className)}>
      <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-4/12 min-w-[240px]"></div>
        </div>
        <div className="skeleton h-16 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
    </div>
  )
}