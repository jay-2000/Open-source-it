from django.shortcuts import render

def index(request):
    return render(request,'index.html')

def pairwise(request):
    inp_text = request.GET.get('text', 'default').strip()
    out = ""
    temp = list(map(str,inp_text.split(' ')))
    for i in range(len(temp)-1):
        out = out + str(int(temp[i])^int(temp[i+1])) + " "
    params = {'p':out.strip(),'inp':inp_text}
    return render(request, 'pairwise.html', params)


def random(request):
    inp_text = request.GET.get('text', 'default').strip()
    out = ""
    temp = list(map(str,inp_text.split('\n')))
    for i in temp:
        temp_inner = list(map(str,i.split(' ')))
        x = 0
        for j in temp_inner:
            x = x^int(j)
        out = out + str(x) + " "
    params = {'r':out.strip(),'inp':inp_text}
    return render(request, 'random.html', params)




