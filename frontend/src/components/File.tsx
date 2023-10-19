import { SpeakerWaveIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import { Card, CardBody, CardHeader, CardProps } from '@nextui-org/react'
import IFile from '../shared/interfaces/IFile'

interface FileProps extends CardProps {
  file: IFile
}

const File = ({ file, ...props }: FileProps) => {
  const filetype = file.mimetype.slice(0, file.mimetype.indexOf('/'))

  return (
    <Card className="h-fit w-40 p-4 hover:cursor-pointer" {...props}>
      <CardHeader className="flex justify-center">
        {filetype === 'audio' ? (
          <SpeakerWaveIcon width={40} />
        ) : (
          <VideoCameraIcon width={40} />
        )}
      </CardHeader>
      <CardBody>
        <p className="line-clamp-3">{file.filename}</p>
      </CardBody>
    </Card>
  )
}

export default File
