import { uploadImages } from '@/apis/images.api';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
    ScrollArea,
} from '@/components/ui';
import { cn } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { Expand, Loader2, RotateCcw, Trash2, UploadCloud } from 'lucide-react';
import { useEffect, useState } from 'react';

export function UploadImages() {
    const [image, setImage] = useState<File>();
    const [files, setFiles] = useState<File[]>([]);
    const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
        {}
    );
    const [dragOver, setDragOver] = useState(false);
    const [fileDropError, setFileDropError] = useState('');

    function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        setDragOver(true);
    }

    function handleDragLeave() {
        setDragOver(false);
    }

    function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
        e.preventDefault();
        setDragOver(false);

        const selectedFiles = Array.from(e.dataTransfer.files);
        if (selectedFiles.some((file) => file.type.split('/')[0] !== 'image')) {
            return setFileDropError('Please provide only image files to upload!');
        }

        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setFileDropError('');
    }

    function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFiles = Array.from(e.target.files as FileList);
        if (selectedFiles.some((file) => file.type.split('/')[0] !== 'image')) {
            return setFileDropError('Please provide only image files to upload!');
        }
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        setFileDropError('');
        selectedFiles.map((item) => setImage(item))
    }

    function simulateLoading(file: File) {
        // Calculates the duration of the timer in milliseconds
        const duration = Math.max(1000, Math.min(file.size / 750, 4000));
        setLoadingState((prev) => ({ ...prev, [file.name]: true }));
        setTimeout(() => {
            setLoadingState((prev) => ({ ...prev, [file.name]: false }));
        }, duration);
    }

    // https://docs.clarifai.com/api-guide/predict/images
    // You can send up to 128 images in one API call. The file size of each image input should be less than 20MB.
    // Improved by ChatGPT
    function formatFileSize(number: number, unit: 'Bytes' | 'MB' = 'MB') {
        if (unit === 'Bytes') {
            const sizeInBytes = number
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return `${sizeInBytes} ${unit}`;
        } else if (unit === 'MB') {
            const sizeInMB = number / (1024 * 1024); // Convert to MB
            return `${sizeInMB.toFixed(3)} ${unit}`;
        }

        return '';
    }

    function generatePreview(file: File) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreviews((prev) => ({
                ...prev,
                [file.name]: reader.result as string,
            }));
        };
        reader.readAsDataURL(file);
    }

    function handlePreview(file: File) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            setPreviewImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }

    function handleDelete(fileName: string) {
        // Filter the files to remove the selected one
        setFiles(files.filter((file) => file.name !== fileName));
    }

    useEffect(() => {
        files.forEach((file) => {
            if (loadingState[file.name] === undefined) {
                generatePreview(file);
                simulateLoading(file);
            }
        });
    }, [files]);

    const { mutate } = useMutation({
        mutationFn: (file: File) => {
            console.log(file);
            return uploadImages(file);
        }
    })


    function handleUpload() {
        if (image) {
            mutate(image);
        }
    }

    return (
        <>
            <div className="w-full max-w-lg rounded-xl border bg-white dark:border-zinc-700 dark:bg-zinc-800">
                <div className="border-b dark:border-zinc-700">
                    <div className="flex flex-row items-center justify-start gap-2 px-4 py-2">
                        <div className="flex flex-row items-center justify-center rounded-full border p-2 dark:border-zinc-700">
                            <UploadCloud className="h-5 w-5 text-zinc-600" />
                        </div>
                        <div>
                            <p className="mb-0 font-semibold">Upload files</p>
                            <p className="text-sm text-zinc-500">
                                Drag and drop your files. Will not be saved.
                            </p>
                        </div>
                    </div>
                </div>
                <form>
                    <Label
                        htmlFor="file"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div
                            className={cn(
                                'm-2 flex flex-col items-center justify-start rounded-xl border-[1.5px] border-dashed px-4 py-2 hover:cursor-pointer dark:border-zinc-700',
                                dragOver && 'border-blue-600 bg-blue-50'
                            )}
                        >
                            <div className="flex flex-col items-center justify-start">
                                <UploadCloud
                                    className={cn(
                                        'my-4 h-5 w-5 text-zinc-600',
                                        dragOver && 'text-blue-500'
                                    )}
                                />
                                <p className="font-semibold">
                                    Choose a file or drag & drop it here
                                </p>
                                <p className="mt-2 text-sm text-zinc-500">
                                    JPEG, PNG formats. Up to 50 MB.
                                </p>
                                <div className="mb-2 mt-4 rounded-xl border bg-white px-3 py-1 text-xs drop-shadow-sm transition-all hover:cursor-pointer hover:drop-shadow dark:border-zinc-700 dark:bg-zinc-700">
                                    Select files
                                </div>
                            </div>
                        </div>
                    </Label>
                    <Input
                        id="file"
                        type="file"
                        name="file"
                        className="hidden"
                        onChange={handleChangeFile}
                        multiple
                    />
                </form>

                {files.length > 0 && (
                    <ScrollArea className="flex max-h-52 w-full flex-col items-center justify-start gap-6 border-t px-4 py-2">
                        {files.map((file, index) => {
                            const isLoading = loadingState[file.name];
                            const preview = imagePreviews[file.name];

                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        'group flex flex-row items-center justify-between rounded-lg border px-2 py-1 dark:border-zinc-700',
                                        index !== 0 ? 'mt-2' : ''
                                    )}
                                >
                                    <div className="flex flex-row items-center justify-start gap-2">
                                        {isLoading ? (
                                            <div className="flex h-10 w-10 flex-row items-center justify-center gap-2 rounded-md border">
                                                <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                                            </div>
                                        ) : (
                                            preview && (
                                                <div className="relative h-10 w-10">
                                                    <img
                                                        className="h-full w-full rounded-md border object-cover"
                                                        src={preview}
                                                        alt="Preview"
                                                    />
                                                </div>
                                            )
                                        )}
                                        <div className="flex flex-col items-start justify-start gap-1">
                                            <p className="w-36 truncate text-sm text-zinc-700 sm:w-44">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-zinc-500">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                        {!isLoading && (
                                            <div className="flex flex-row items-center justify-between gap-1 rounded-full px-2 py-[0.5px] text-xs">
                                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                                <p className="text-zinc-500">Uploaded</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    className="hidden px-3 transition-all group-hover:flex"
                                                    variant="ghost"
                                                    onClick={() => handlePreview(file)}
                                                >
                                                    <Expand className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>{file.name}</DialogTitle>
                                                <div className="relative flex h-full min-h-[300px] w-full flex-col items-center justify-center rounded-xl bg-zinc-100">
                                                    {previewImage ? (
                                                        <img
                                                            className="h-full w-full rounded-md border object-cover"
                                                            src={previewImage}
                                                            alt="Preview"
                                                        />
                                                    ) : (
                                                        <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                                                    )}
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                        <Button
                                            className="px-3"
                                            variant="destructive"
                                            onClick={() => handleDelete(file.name)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </ScrollArea>
                )}
                {fileDropError && (
                    <p className="text-sm text-red-400">{fileDropError}</p>
                )}
            </div>

            {files.length > 0 && (
                <>
                    <Button className="mt-2" variant="ghost" onClick={() => setFiles([])}>
                        <RotateCcw className="mr-1 inline-block h-4 w-4" />
                        Reset
                    </Button>
                    <Button onClick={() => handleUpload()} className='mt-2' variant="secondary" >
                        <UploadCloud className='mr-1 inline-block h-4 w-4' />
                        Upload
                    </Button>
                </>
            )}
        </>
    );
}