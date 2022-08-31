provider "aws" {
    region = "us-east-1"
    access_key = var.access_key
    secret_key = var.secret_key
}

resource "aws_key_pair" "producktiv_key" {
    key_name = "producktiv_key"
    public_key = file(var.key_pair)
}

resource "aws_instance" "producktiv" {
    ami = "ami-08d4ac5b634553e16"
    instance_type = "t2.micro"
    key_name = aws_key_pair.producktiv_key.key_name
    tags = {
        Name = "producktiv"
    }
}
