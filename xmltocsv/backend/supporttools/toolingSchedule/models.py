from django.db import models
from django.utils import timezone

# Create your models here.
class Tool(models.Model):
    tool_name = models.CharField(max_length=45, null=False)
    tool_serial_class = models.ForeignKey('ToolSerialClass', on_delete=models.CASCADE, null=True, blank=True)
    tool_serial = models.CharField(max_length=45, unique=True)
    part_number = models.CharField(max_length=45, null=False)
    tool_quantity = models.IntegerField(null=False)
    tool_is_out_for_service = models.BooleanField(null=False, default=False)
    tool_is_out_for_service_date = models.DateTimeField(blank=True, null=True, default=None)
    tool_has_returned = models.BooleanField(null=False, default=True)
    tool_has_returned_date = models.DateTimeField(blank=True, null=True)
    tool_has_half_life = models.BooleanField(null=False, default=False)
    tool_half_life_quantity = models.IntegerField(null=False, default=0)
    tool_requires_match = models.BooleanField(null=False, default=False)
    tool_match = models.CharField(max_length=45, null=True, blank=True)
    tool_is_active = models.BooleanField(null=False, default=True)
    tool_inactive_date = models.DateTimeField(null=True, blank=True, default=None)

    #override the save to automatically add the tool class
    #check if the tool class already exists
    def save(self, *args, **kwargs):
        #when the tools serials is update tool_class will update as well
        tool_class_str = self.tool_serial[:4].upper() + "00X"

        tool_serial_class, created = ToolSerialClass.objects.get_or_create(
            tool_class=tool_class_str,
        )

        self.tool_serial_class = tool_serial_class


        #handling dates when tool_is_active updates
        if(self.tool_is_active == False and self.tool_inactive_date is None):
            self.tool_inactive_date = timezone.now()
        elif(self.tool_is_active == True):
            self.tool_inactive_date = None

        #handling dates when tool_is_out_for_service updates
        if(self.tool_is_out_for_service == True and self.tool_is_out_for_service_date is None):
            self.tool_is_out_for_service_date = timezone.now()
        elif(self.tool_is_out_for_service == False):
            self.tool_is_out_for_service_date = None         

        #Save the tool first so the foreign key relations are fulfilled
        super(Tool, self).save(*args, **kwargs)
        
        #checks if the tool has returned and if so add 1 to the sharpen count
        if(self.tool_is_out_for_service):
            #try to get the latest sharpen record
            try:
                max_sharpen = self.max_sharpen_set.latest('id')
                max_sharpen.times_sharpened += 1
                max_sharpen.save()
            except Max_Sharpen.DoesNotExist:
                pass

    #delete serial class if all tools are no longer associated with it
    def delete(self, *args, **kwargs):
        tool_serial_class = self.tool_serial_class
        super(Tool, self).delete(*args, **kwargs)

        if not Tool.objects.filter(tool_serial_class=tool_serial_class).exists():
            tool_serial_class.delete()
    
    def __str__(self):
        return f"{self.id}-{self.tool_name}-{self.tool_serial}-{self.tool_quantity}-{self.tool_is_active}"

class Machine(models.Model):
    machine_name = models.CharField(max_length=45, null=False)
    tool = models.ForeignKey("Tool", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.machine_name}"

class Manufacturer(models.Model):
    manufacturer_name = models.CharField(max_length=45, null=False)
    manufacturer_website = models.URLField()
    manufacturer_vendor = models.CharField(max_length=45, null=False)
    tool = models.ForeignKey("Tool", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.manufacturer_name}"

class Quantity_Requirements(models.Model):
    quantity_requested = models.IntegerField(null=False)
    quantity_minimum = models.IntegerField(null=False)
    tool = models.ForeignKey("Tool", on_delete=models.CASCADE)

class Tool_Type(models.Model):
    tool_type = models.CharField(max_length=45, null=False)
    tool = models.ForeignKey("Tool", on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.tool_type}"
    

class Max_Sharpen(models.Model):
    times_sharpened = models.IntegerField(null=False, default=0)
    max_sharpen_amount = models.IntegerField(null=False)
    tool = models.ForeignKey("Tool", on_delete=models.CASCADE)

class Service(models.Model):
    time_to_change = models.BooleanField(null=False, default=False)
    tool_on_order = models.BooleanField(null=False, default=False)
    tool = models.ForeignKey("Tool", on_delete=models.CASCADE)

class ToolSerialClass(models.Model):
    tool_class = models.CharField(max_length=10, unique=True)
    
    def __str__(self):
        return self.tool_class