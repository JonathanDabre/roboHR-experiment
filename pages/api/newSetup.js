import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
  const formData = await req.formData();
  console.log('/home/jonathan/pbl-project/roboHR-experiment/documents')
  console.log(process.cwd)
  console.log('1')

  const file = formData.get("file");
  console.log('2')
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  console.log('3')

  const buffer = Buffer.from(await file.arrayBuffer());
  console.log('4')
  const filename =  file.name.replaceAll(" ", "_");
  console.log(filename);
  
  try {
    await writeFile(
      path.join(process.cwd(), "documents/" + filename),
      buffer
    );
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
