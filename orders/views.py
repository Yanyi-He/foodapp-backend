from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # 管理员可看全部，普通用户仅看自己的
        return Order.objects.all().order_by('-created_at') if user.is_staff \
            else Order.objects.filter(user=user).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        # 注入 request 到 serializer.context 用于取当前用户
        serializer = self.get_serializer(data=request.data)
        serializer.context.update({'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, *args, **kwargs):
        # 仅允许合法状态流转；普通用户不能标记 COMPLETED
        order = self.get_object()
        new_status = request.data.get('status')
        if new_status == 'COMPLETED' and not request.user.is_staff:
            return Response({'detail': 'You do not have permit'}, status=403)
        return super().partial_update(request, *args, **kwargs)
