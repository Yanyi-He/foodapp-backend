from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from .models import MenuItem
from .serializers import MenuItemSerializer


class MenuItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [permissions.AllowAny]  # 菜单公开
