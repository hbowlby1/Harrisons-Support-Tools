from django.db import models

# Create your models here.
class Tool(models.Model):
    tool_name = models.CharField(max_length=45, null=False)
    tool_serial = models.CharField(max_length=45, null=False, unique=True)
    part_number = models.CharField(max_length=45, null=False)
    tool_quantity = models.IntegerField(null=False)
    tool_is_out_for_service = models.BooleanField(null=False)
    tool_is_out_for_service_date = models.DateTimeField(blank=True, null=True)
    tool_has_returned = models.BooleanField(null=False)
    tool_has_returned_date = models.DateTimeField(blank=True, null=True)
    tool_has_half_life = models.BooleanField(null=False)
    tool_half_life_quantity = models.IntegerField(null=False)
    tool_requires_match = models.BooleanField(null=False)
    tool_is_active = models.BooleanField(null=False)
    
    def __str__(self):
        return f"{self.tool_name}-{self.tool_serial}-{self.tool_quantity}-{self.tool_is_active}"

class Machine(models.Model):
    machine_name = models.CharField(max_length=45, null=False)
    tool = models.ForeignKey("Tool", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.machine_name}"

class Manufacturer(models.Model):
    name = models.CharField(max_length=45, null=False)
    manufacturer_website = models.URLField()
    manufacturer_vendor = models.CharField(max_length=45, null=False)
    tool = models.ForeignKey("Tool", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name}"

class Quantity_Requirements(models.Model):
    quantity_requested = models.IntegerField(null=False)
    quantity_minimum = models.IntegerField(null=False)
    tool = models.ForeignKey("Tool", on_delete=models.CASCADE)

class Tool_Type(models.Model):
    tool_type = models.CharField(max_length=45, null=False)
    tool = models.ForeignKey("Tool", on_delete=models.CASCADE)
    

class Max_Sharpen(models.Model):
    times_sharpened = models.IntegerField(null=False)
    max_sharpen_amount = models.IntegerField(null=False)
    tool = models.ForeignKey("Tool", on_delete=models.CASCADE)

class Service(models.Model):
    time_to_change = models.BooleanField(null=False)
    tool_on_order = models.BooleanField(null=False)
    tool = models.ForeignKey("Tool", on_delete=models.CASCADE)

