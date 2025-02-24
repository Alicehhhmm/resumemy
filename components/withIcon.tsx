import React, { FC, ComponentType } from 'react'

type IconType = ComponentType<{ className?: string }>

interface WithIconProps {
    icon: IconType
    className?: string
    // 其他扩展属性
    [key: string]: any
}

export const WithIcon: FC<WithIconProps> = React.memo(props => {
    const { icon: IconComponent, className = '', ...rest } = props
    return <IconComponent className={className} {...rest} />
})

export default WithIcon
