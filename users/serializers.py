from django.contrib.auth.models import User
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 6}
        }

    def create(self, validated_data):
        # 使用 set_password 把明文变哈希
        user = User(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user
