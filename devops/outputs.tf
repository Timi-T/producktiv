output "public_ip" {
  description = "Public ip of ec2 instace"
  value = try(aws_instance.producktiv.public_ip, "")
}