from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta

from toolingSchedule.models import Tool

class Command(BaseCommand):
    help = 'Delete tools that have been inactive for 30 days or more'

    def handle(self, *args, **kwargs):
        cutoff_date = timezone.now() + timedelta(days=30)
        print(cutoff_date)
        Tool.objects.filter(tool_is_active=False, tool_inactive_date__lte=cutoff_date).delete()