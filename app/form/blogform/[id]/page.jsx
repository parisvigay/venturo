import BlogForm from "@/components/BlogForm/BlogForm"
export default function FormPage(req) {
    const blogId = req.params.id
    return (
        <main className="flex min-h-screen flex-col items-center">
        <BlogForm blogId = {blogId}/>
        </main>
    )
}
