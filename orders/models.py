from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from menu.models import MenuItem


class Order(models.Model):
    STATUS_CHOICES = [
        ('ORDERED', 'ordered'),
        ('PAID', 'paid'),
        ('COMPLETED', 'completed'),
        ('CANCELLED', 'cancelled'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=10, choices=STATUS_CHOICES, default='ORDERED')

    def __str__(self):
        return f'Order#{self.id} by {self.user.username}'


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, related_name='order_items', on_delete=models.CASCADE)
    item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.item.name} x {self.quantity}'
